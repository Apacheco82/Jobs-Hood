import React, {useState, useEffect, useContext} from "react";
import {changePassword, getUserPrivate, userById} from "../services";
import {useNavigate, useParams} from "react-router-dom";
import UserWorker from "../component/UserWorker.jsx";
import Spinner from "../component/Spinner.jsx";
import {Context} from "../store/appContext.js";
import Review from "../component/review.jsx";
import Questions from "../component/questions.jsx";
import {Navbar} from "../component/navbar.js";
import Modal from "../component/Modal.jsx";
import {Tab, Nav} from "react-bootstrap";
import "../../styles/worker-profile.css";

export const Profile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {store, actions} = useContext(Context);
  const [spinner, setSpinner] = useState(false);
  const [userReviews, setUserReviews] = useState([]);
  const [userQuestions, setUserQuestions] = useState([]);
  const [password, setPassword] = useState({
    email: "",
    old_password: "",
    new_password: "",
    password_check: "",
  });
  const [show, setShow] = useState(false);
  const [small, setSmall] = useState(false);
  const [passWrong, setPassWrong] = useState(false);
  const [passOk, setPassOk] = useState(false);
  const [activeKey, setActiveKey] = useState("#nav-home");

  const handleShow = () => {
    setShow(!show);
  };

  const getInfoUser = async () => {
    if (params.id) {
      //perfil publico
      const info = await userById(params.id); //llamamos a la función que obtiene un USER filtrando por su ID
      return info.data;
    } //perfil privado
    const workerData = await getUserPrivate();
    return workerData;
  };

  const handleEdit = async () => {
    navigate("/edit/profile-worker");
  };

  const fetchData = async () => {
    setSpinner(true);
    const infoWorker = await getInfoUser();
    actions.setUser(infoWorker);
    setUserReviews(infoWorker.written_reviews);
    setUserQuestions(infoWorker.written_questions);
    console.log(userQuestions)
    setSpinner(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const passwordChange = ({target}) => {
    setPassword({...password, [target.name]: target.value});
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    password.email = store.user.email;
    if (password.new_password == password.password_check) {
      //si el password nuevo coincide con la repeticion
      try {
        const response = await changePassword(password);
        if (!response.error) {
          setPassOk(true);
          setTimeout(() => {
            setPassOk(false);
            setShow(false);
          }, 2000);
        } else {
          setPassWrong(true);
          setTimeout(() => {
            setPassWrong(false);
          }, 2000);
        }
      } catch (error) {
        console.log(error); //provisional
      }
    } else {
      setSmall(true);
      setTimeout(() => {
        setSmall(false);
      }, 2000);
    }
  };

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <div className="worker-profile">
          <Navbar />

          <div className="container container-fluid d-flex justify-content-center align-items-center">
            <div className="card card-form p-5 m-5">
              <UserWorker
                onClick={handleEdit}
                user={store.user}
                userPrivate={!params.id}
                showEditButton={!params.id}
              />
              {!params.id && (
                <Modal
                  handlePassword={handlePassword}
                  passwordChange={passwordChange}
                  show={show}
                  handleShow={handleShow}
                  small={small}
                  passWrong={passWrong}
                  passOk={passOk}
                />
              )}
            </div>
          </div>

          <div className="container d-flex justify-content-center mt-1">
            <Nav
              variant="tabs"
              activeKey={activeKey}
              onSelect={(k) => setActiveKey(k)}
            >
              <Nav.Item>
                <Nav.Link eventKey="#nav-home">Opiniones del usuario</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="#nav-questions">
                  Preguntas del usuario
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>

          <Tab.Content>
            <Tab.Pane eventKey="#nav-home" active={activeKey === "#nav-home"}>
              <div className="container d-flex justify-content-center mt-3">
                {userReviews.map((review, index) => (
                  <Review
                    key={index}
                    text={review.text}
                    receiver_id={review.receiver_id}
                    opinion={true}
                    rating={review.rating}
                    data={review.data_create}
                    type={review.receiver.roles.description}
                  />
                ))}
              </div>
            </Tab.Pane>
            <Tab.Pane
              eventKey="#nav-questions"
              active={activeKey === "#nav-questions"}
            >
              <div className="container d-flex justify-content-center">
                <div className="row d-flex justify-content-center m-3">
                {userQuestions.map((question, index) => (
                  <Questions
                    key={index}
                    text={question.text}
                    data={question.data_create}
                    question={true}
                    lawyer_id={question.lawyer_id}
                  />
                ))}
                </div>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </div>
      )}
    </>
  );
};
