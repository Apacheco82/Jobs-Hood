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
    col_number: "",
  };

  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [alert, setAlert] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(false);
    await registerLawyer(form);
    setForm(initialState);
    setSpinner(false);
    if (registerLawyer) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
        navigate("/login");
      }, 3000);
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
          <div className="d-flex justify-content-center m-5">
            {alert && (
              <div className="alert alert-success" role="alert">
                Usuario creado correctamente
              </div>
            )}
          </div>
          <div className="card d-flex justify-content-between m-5">
            <Form
              userType="lawyer"
              form={form}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </>
      )}
    </>
  );
};
