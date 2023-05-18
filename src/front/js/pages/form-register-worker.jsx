
import React, {useState, useEffect, useContext} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Navbar } from "../component/navbar.js";
import {registerUser, checkUser} from "../services";
import FormUser from "../component/FormUser.jsx";
import Spinner from "../component/Spinner.jsx";
import Alert from "../component/Alert.jsx";

export const RegistroWorker = () => {
  const [spinner, setSpinner] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [className, setClassName] = useState("");
  const navigate = useNavigate();

  const [registro, setRegistro] = useState({
    user_name: "",
    password: "",
    name: "",
    last_name: "",
    email: ""
  });

  const handleChange = ({target}) => {
    // el valor que se escriba en el form se sustituye en el campo name de cada apartado del objeto,
    setRegistro({...registro, [target.name]: target.value}); // se setean los cambios en el usestate de registro
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSpinner(true);
    const check = await checkUser(registro);
    //console.log(check.msg);
    setAlert(true);
    setClassName("danger");
    setMessage(check.msg);
    setAlert(false);
    if (!check.error) {
      try {
        const register = await registerUser(registro);
        if (register) {
          setSpinner(false)
          setAlert(true);
          setClassName("success");
          setMessage(register.msg)
          setTimeout(() => {
            setAlert(false);
            navigate("/login");
          }, 3000);
        }
      } catch (error) {
        setAlert(true);
        setClassName("danger");
        setMessage("Error del servidor");
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      }
    } else {
      setAlert(true);
    }
  };
  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>
        <Navbar/>
          {" "}
          {alert && (
            <div className="d-flex justify-content-center m-5">
              <Alert className={className} message={message} />
            </div>
          )}
          <div className="card d-flex justify-content-between m-5">
            <FormUser handleChange={handleChange} handleSubmit={handleSubmit} />
          </div>
        </>
      )}
    </>
  );
};
