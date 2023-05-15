import React, {useEffect, useState, useContext} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {userById, getUserPrivate} from "../services";
import UserInfo from "../component/UserInfo.jsx";
import {Tab, Nav} from "react-bootstrap";
import {createReview, checkReview} from "../services/review.js";
import {createQuestion, checkQuestion} from "../services/question";
import Review from "../component/review.jsx";
import Questions from "../component/questions.jsx";
import WriteReview from "../component/WriteReview.jsx";
import WriteQuestion from "../component/WriteQuestion.jsx";
import LinkButton from "../component/LinkButton.jsx";
import Spinner from "../component/Spinner.jsx";
import {Context} from "../store/appContext.js";

export const LawyerProfile = () => {
  const params = useParams();
  const [lawyer, setLawyer] = useState({});
  const [review, setReview] = useState([]);
  const [question, setQuestion] = useState([]);
  const [activeKey, setActiveKey] = useState("#nav-home");
  const [canWrite, setCanWrite] = useState(false);
  const [canAsk, setCanAsk] = useState(false);
  const [opinion, setOpinion] = useState({
    receiver_id: 0,
    author_id: 0,
    rating: 0,
    text: "",
    user_name: "",
  });
  const [ask, setAsk] = useState({
    lawyer_id: 0,
    user_id: 0,
    user_name: "",
    text: "",
  });
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const {store, actions} = useContext(Context);

  const token = localStorage.getItem("token"); //el token del usuario que está logado, si es que hay alguien logado
  //console.log(token)

  const getInfoUser = async () => {
    if (params.id) {
      //perfil publico
      const info = await userById(params.id); //llamamos a la función que obtiene un USER filtrando por su ID
      return info.data;
    } //perfil privado
    const lawyerData = await getUserPrivate();
   // console.log(lawyerData);
    return lawyerData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lawyerId = params.id; //parámetro que puede llegar o no desde la URL (ver layout.js)
        //setSpinner(true);
        const screenUser = await getInfoUser();
        actions.setUser(screenUser);
        setLawyer(screenUser.lawyer);
        setReview(screenUser.received_reviews);
        setQuestion(screenUser.received_questions);
        //console.log(screenUser)
        //setSpinner(false);
        if (token) {
          const role = localStorage.getItem("role"); //obtenemos el rol del localstorage
          const loggedUser = await getUserPrivate(); //obtenemos el usuario completo que está logado en este momento en la web
          const userHasReview = checkReview(loggedUser, lawyerId);
          if (role === "User" && !userHasReview) {
            setCanWrite(true);
          }
          const userHasAsk = checkQuestion(loggedUser, lawyerId);
          if (role === "User" && !userHasAsk) {
            setCanAsk(true);
          }
          console.log("antes del if abogado", loggedUser)
          if (lawyerId == loggedUser["id"]) {
            console.log("puede responder", loggedUser)
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
    const newReviews = [...review, response.data];
    setReview(newReviews); // Actualizar la lista de revisiones
    //console.log("review", response.data)
    setCanWrite(false);
    setSpinner(false);
  };
  const questionChange = (e) => {
    const {name, value} = e.target;
    //console.log(value)
    setAsk({...ask, [name]: value});
  };

  const questionSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    const userToken = localStorage.getItem("token");
    const userData = await getUserPrivate(userToken);
    //console.log(userData)
    const myQuestion = {
      ...ask,
      lawyer_id: params.id,
      user_id: userData.id,
      user_name: userData.user_name,
    };
    setAsk(myQuestion);
    const response = await createQuestion(myQuestion);
    const newQuestion = [...question, response.data];
    setQuestion(newQuestion); // Actualizar la lista de preguntas
    setCanAsk(false);
    setSpinner(false);
  };

  const handleEdit = async () => {
    navigate("/edit/profile-lawyer");
  };

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>
          <UserInfo
            user={store.user}
            profile={lawyer}
            showEditButton={!params.id}
            onClick={handleEdit}
            isLawyer={true}
          />
          <div>
            <div className="container d-flex justify-content-center mt-1">
              <Nav
                variant="tabs"
                activeKey={activeKey}
                onSelect={(k) => setActiveKey(k)}
              >
                <Nav.Item>
                  <Nav.Link eventKey="#nav-home">Opiniones</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="#nav-questions">Preguntas</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>

            <div className="container d-flex justify-content-center mt-1">
              <Tab.Content>
                <Tab.Pane
                  eventKey="#nav-home"
                  active={activeKey === "#nav-home"}
                >
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
                        text={review.text}
                        user_name={review.user_name}
                        rating={review.rating}
                        data={review.data_create}
                      />
                    ))}
                  </div>
                </Tab.Pane>

                <Tab.Pane
                  eventKey="#nav-questions"
                  active={activeKey === "#nav-questions"}
                >
                  {!token && (
                    <LinkButton
                      direction={"/login"}
                      text={"Inicia sesión para poder dar tu opinión"}
                      type={"button"}
                    />
                  )}
                  {canAsk && (
                    <WriteQuestion
                      questionChange={questionChange}
                      questionSubmit={questionSubmit}
                    />
                  )}
                  {question.map((question, index) => (
                    <Questions
                      key={index}
                      text={question.text}
                      user_name={question.user_name}
                      comment={question.question_comment}
                      data={question.data_create}
                    />
                  ))}
                </Tab.Pane>
              </Tab.Content>
            </div>
          </div>
        </>
      )}
    </>
  );
};
