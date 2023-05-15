import React, {useState, useEffect} from "react";
import {registerLawyer} from "../services/lawyer.js";
import {useNavigate} from "react-router-dom";
import Form from "../component/Form.jsx";
import Spinner from "../component/Spinner.jsx";

export const RegistroLawyer = () => {
  const initialState = {
    user_name: "",
    password: "",
    name: "",
    last_name: "",
    email: "",
    address: "",
    province: "",
    cp: "",
    col_number: "",
  };

  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);

  // Función que actualiza el user_name basado en el campo email
  const updateUserName = (email) => {
    const userName = email.replace(/\s+/g, "");
    setForm({...form, user_name: userName});
  };

  // Actualiza el user_name cada vez que el campo email cambia
  useEffect(() => {
    updateUserName(form.email);
  }, [form.email]);

  const handleChange = (e) => {
    // el valor que se escriba en el form se sustituye en el campo name de cada apartado del objeto,
    const {name, value} = e.target;
    setForm({...form, [name]: value}); // se setean los cambios en el usestate de form
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSpinner(true);
    await registerLawyer(form);
    setForm(initialState);
    setSpinner(false);
    if (registerLawyer) {
      navigate("/login");
    } else {
      navigate("/");
    } //provisional, aquí se pondrán alerts de bootstrap en pantalla para controlar errores
  };

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>
          <Form
            userType="lawyer"
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </>
      )}
    </>
  );
};
