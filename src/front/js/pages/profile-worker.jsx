import React, {useState, useEffect, useContext} from "react";
import {changePassword,getUserPrivate, userById} from "../services";
import {useNavigate, useParams} from "react-router-dom";
import UserWorker from "../component/UserWorker.jsx";
import Spinner from "../component/Spinner.jsx";
import {Context} from "../store/appContext.js";
import Review from "../component/review.jsx";
import {Navbar} from "../component/navbar.js";
import Modal from "../component/Modal.jsx";

export const Profile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {store, actions} = useContext(Context);
  const [spinner, setSpinner] = useState(false);
  const [userReviews, setUserReviews] = useState([]);
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
          console.log(response);
          setTimeout(() => {
            setPassOk(false);
            setShow(false);
          }, 2000);
        } else {
          setPassWrong(true);
          setTimeout(() => {
          setPassWrong(false)
          }, 2000);
        }
      } catch (error) {
        console.log(error);//provisional
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
        <React.Fragment>
          <Navbar />

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

          <div className="container">
            <h4> Opiniones del usuario :</h4>
            {userReviews.map((review, index) => (
              <Review
                key={index}
                text={review.text}
                user_name={review.user_name}
                rating={review.rating}
                data={review.data_create}
              />
            ))}
          </div>
        </React.Fragment>
      )}
    </>
  );
};
