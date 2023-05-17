import React, {useEffect, useState, useContext} from "react";
import {Tab, Nav} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {userById, getUserPrivate} from "../services";
import {createReview, checkReview} from "../services/review.js";
import UserInfo from "../component/UserInfo.jsx";
import Review from "../component/review.jsx";
import WriteReview from "../component/WriteReview.jsx";
import LinkButton from "../component/LinkButton.jsx";
import Spinner from "../component/Spinner.jsx";
import {Context} from "../store/appContext.js";

export const CompanyProfile = () => {
  const params = useParams();
  const [company, setCompany] = useState({});
  const [review, setReview] = useState([]);
  const [activeKey, setActiveKey] = useState("#nav-home");
  const [canWrite, setCanWrite] = useState(false);
  const [opinion, setOpinion] = useState({
    receiver_id: 0,
    author_id: 0,
    rating: 0,
    text: "",
    user_name: "",
  });
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const {store, actions} = useContext(Context);

  const token = localStorage.getItem("token"); //el token del usuario que está logado, si es que hay alguien logado

  const getInfoUser = async () => {
    if (params.id) {
      //perfil publico
      const info = await userById(params.id); //llamamos a la función que obtiene un USER filtrando por su ID
      return info.data;
    } //perfil privado
    const companyData = await getUserPrivate();
    return companyData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyId = params.id; //parámetro que puede llegar o no desde la URL (ver layout.js)
        setSpinner(true);
        const screenUser = await getInfoUser();
        actions.setUser(screenUser);
        setCompany(screenUser.company);
        setReview(screenUser.received_reviews);

        if (token) {
          const role = localStorage.getItem("role"); //obtenemos el rol del localstorage
          const loggedUser = await getUserPrivate(); //obtenemos el usuario completo que está logado en este momento en la web
          const userHasReview = checkReview(loggedUser, companyId);
          if (role === "User" && !userHasReview) {
            setCanWrite(true);
          }
        }
        setSpinner(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const reviewChange = (e) => {
    const {name, value} = e.target;
    setOpinion({...opinion, [name]: value});
  };

  const reviewSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    const userToken = localStorage.getItem("token");
    const userData = await getUserPrivate(userToken);
    const myOpinion = {
      ...opinion,
      receiver_id: params.id,
      author_id: userData.id,
      user_name: userData.user_name,
    };
    setOpinion(myOpinion);
    const response = await createReview(myOpinion);
    setCanWrite(false);
    const newReviews = [...review, response.data];
    setReview(newReviews); // Actualizar la lista de revisiones
    setSpinner(false);
  };

  const handleEdit = async () => {
    navigate("/edit/profile-company");
  };

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>
          <UserInfo
            onClick={handleEdit}
            user={store.user}
            profile={company}
            showEditButton={!params.id}
          />

          <div className="container d-flex justify-content-center mt-1">
            <Nav
              variant="tabs"
              activeKey={activeKey}
              onSelect={(k) => setActiveKey(k)}
            >
              <Nav.Item>
                <Nav.Link eventKey="#nav-home">
                  Opiniones de la empresa
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <div className="container d-flex justify-content-center mt-1">
            <Tab.Content>
              <Tab.Pane eventKey="#nav-home" active={activeKey === "#nav-home"}>
                <div>
                  {" "}
                  {!token && (
                    <LinkButton
                      direction={"/login"}
                      text={"Inicia sesión para poder dar tu opinión"}
                      type={"button"}
                    />
                  )}
                  {canWrite && (
                    <WriteReview
                      reviewChange={reviewChange}
                      reviewSubmit={reviewSubmit}
                    />
                  )}
                  {review.map((review, index) => (
                    <Review
                      key={index}
                      userID={review.author_id}
                      text={review.text}
                      user_name={review.user_name}
                      rating={review.rating}
                      data={review.data_create}
                    />
                  ))}
                </div>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </>
      )}
    </>
  );
};