// faltará añadir navbar y footer
import React, {useState, useEffect, useContext} from "react";
import {useNavigate, useParams} from "react-router-dom";
//import { Link } from "react-router-dom";
//import { Navbar } from ".././component/navbar";
import {Context} from "../store/appContext";
import {registerUser} from "../services";
import FormUser from "../component/FormUser.jsx";
import Spinner from "../component/Spinner.jsx";

export const RegistroWorker = () => {
  const {store, actions} = useContext(Context);
  const [spinner, setSpinner] = useState(false);

  const navigate = useNavigate();

  const [registro, setRegistro] = useState({
    user_name: "",
    password: "",
    name: "",
    last_name: "",
    email: "",
  });

  const handleChange = ({target}) => {
    // el valor que se escriba en el form se sustituye en el campo name de cada apartado del objeto,
    setRegistro({...registro, [target.name]: target.value}); // se setean los cambios en el usestate de registro
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSpinner(true);
    const register = await registerUser(registro);
    setSpinner(false);
    if (register) {
      navigate("/login");
    } else {
      navigate("/");
    } // Pintar alerts entc en el front para controlar esta parte, de momento se queda con este condicional
  };

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>
          <FormUser handleChange={handleChange} handleSubmit={handleSubmit} />
        </>
      )}
    </>
  );
};
