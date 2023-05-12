import React, {useEffect, useState} from "react";
import {Tab, Nav} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {userById, getUserPrivate} from "../services";
import {getReviewPerCompany} from "../services/company.js";
import {createReview, checkReview} from "../services/review.js";
import UserInfo from "../component/UserInfo.jsx";
import Review from "../component/review.jsx";
import WriteReview from "../component/WriteReview.jsx";
import LinkButton from "../component/LinkButton.jsx";
import Spinner from "../component/Spinner.jsx";

const initialState = {
  receiver_id: 0,
  author_id: 0,
  rating: 0,
  text: "",
  user_name: "",
};

export const CompanyProfile = () => {
  const params = useParams();
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({});
  const [company, setCompany] = useState({});
  const [review, setReview] = useState([]);
  const [activeKey, setActiveKey] = useState("#nav-home");
  const [canWrite, setCanWrite] = useState(false);
  const [opinion, setOpinion] = useState(initialState);
  const [buttonLogin, setButtonLogin] = useState(false);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyId = params.id; //parámetro que puede llegar o no desde la URL (ver layout.js)
        const token = localStorage.getItem("token"); //el token del usuario que está logado, si es que hay alguien logado

        if (!companyId) {
          setSpinner(true);
          //si no hemos usado la ruta con id, estamos entrando por TOKEN
          const companyData = await getUserPrivate(token); //se llama a la función que obtiene los datos de usuario a partir del token y los guardamos en una const
          setUser(companyData); //seteamos el useState de USER
          setCompany(companyData.company); //seteamos el useState de COMPANY
          setLogin(true); //seteamos el useState LOGIN a TRUE, para poder editar todos los campos del formulario
          setSpinner(false);
        } else {
          setSpinner(true);
          //si hemos usado la ruta con ID
          //primero obtenemos los datos de la empresa que se pintan en pantalla
          const info = await userById(companyId); //llamamos a la función que obtiene un USER filtrando por su ID
          setUser(info.data); //seteamos el useState de USER
          setCompany(info.data.company); //seteamos el useState de COMPANY
          const getReview = await getReviewPerCompany(companyId);
          setReview(getReview.data);
          setLogin(false); //seteamos el useState de LOGIN a FALSE, porque no vamos a poder editar los campos del formulario
          setSpinner(false);
          if (!token) {
            setButtonLogin(true);
          } else {
            const role = localStorage.getItem("role"); //obtenemos el rol del localstorage
            const user = await getUserPrivate(); //obtenemos el usuario completo que está logado en este momento en la web
            const userHasReview = checkReview(user, companyId);
            if (role === "User" && !userHasReview) {
              setCanWrite(true);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const reviewChange = (e) => {
    const {name, value} = e.target;
    //console.log(value)
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
    //console.log("my opinion",myOpinion)
    const response = await createReview(myOpinion);
    //console.log("response",response)
    setCanWrite(false);
    const newReviews = [...review, response.data];
    setReview(newReviews); // Actualizar la lista de revisiones
    //console.log("review", response.data)
    setSpinner(false);
  };

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>
          <UserInfo user={user} profile={company} showEditButton={login} />

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
                  {buttonLogin && (
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
