import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {userById, getUserPrivate} from "../services";
import UserInfo from "../component/UserInfo.jsx";
import {Tab, Nav} from "react-bootstrap";
import {getReviewPerLawyer} from "../services/lawyer";
import {createReview, checkReview} from "../services/review.js";
import Review from "../component/review.jsx";
import Questions from "../component/questions.jsx";
import WriteReview from "../component/WriteReview.jsx";
import WriteQuestion from "../component/WriteQuestion.jsx";
import WriteQuestion from "../component/WriteQuestion.jsx";
import LinkButton from "../component/LinkButton.jsx";
import Spinner from "../component/Spinner.jsx";

const initialState = {
  receiver_id: 0,
  author_id: 0,
  rating: 0,
  text: "",
  user_name: "",
};

export const LawyerProfile = () => {
  const params = useParams();
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({});
  const [lawyer, setLawyer] = useState({});
  const [review, setReview] = useState([]);
  const [question, setQuestion] = useState([]);
  const [activeKey, setActiveKey] = useState("#nav-home");
  const [canWrite, setCanWrite] = useState(false);
  const [opinion, setOpinion] = useState(initialState);
  const [buttonLogin, setButtonLogin] = useState(false);

  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lawyerId = params.id; //parámetro que puede llegar o no desde la URL (ver layout.js)

        const token = localStorage.getItem("token"); //el token del usuario que está logado, si es que hay alguien logado

        if (!lawyerId) {
          setSpinner(true);
          //si no hemos usado la ruta con id, estamos entrando por TOKEN
          const lawyerData = await getUserPrivate(token); //se llama a la función que obtiene los datos de usuario a partir del token y los guardamos en una const
          setUser(lawyerData); //seteamos el useState de USER
          setLawyer(lawyerData.lawyer); //seteamos el useState de COMPANY
          setLogin(true); //seteamos el useState LOGIN a TRUE, para poder editar todos los campos del formulario
          setSpinner(false);
        } else {
          setSpinner(true);
          //si hemos usado la ruta con ID
          //primero obtenemos los datos de la empresa que se pintan en pantalla
          const info = await userById(lawyerId); //llamamos a la función que obtiene un USER filtrando por su ID
          setUser(info.data); //seteamos el useState de USER
          setLawyer(info.data.lawyer); //seteamos el useState de COMPANY
          //console.log("la info del abogado", info);
          const getReview = await getReviewPerLawyer(lawyerId);
          setReview(getReview.data);
          const getQuestion = info.data.received_questions;
          setQuestion(getQuestion);
          // console.log("las questions", getQuestion);
          setLogin(false); //seteamos el useState de LOGIN a FALSE, porque no vamos a poder editar los campos del formulario
          setSpinner(false);
          if (!token) {
            setButtonLogin(true);
          } else {
            const role = localStorage.getItem("role"); //obtenemos el rol del localstorage
            const user = await getUserPrivate(); //obtenemos el usuario completo que está logado en este momento en la web
            const userHasReview = checkReview(user, lawyerId);
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
    const newReviews = [...review, response.data];
    setReview(newReviews); // Actualizar la lista de revisiones
    //console.log("review", response.data)
    setCanWrite(false);
    setSpinner(false);
  };

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>
          <UserInfo
            user={user}
            profile={lawyer}
            showEditButton={login}
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
    
            <Tab.Pane
                  eventKey="#nav-questions"
                  active={activeKey === "#nav-questions"}
                >
                  {canWrite && (
                <WriteQuestion
                //questionChange={questionChange}
                //questionSubmit={questionSubmit}
              />)}
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
