import React, {useState, useEffect} from "react";
import {companyRegister} from "../services/company";
import {useNavigate} from "react-router-dom";
import Form from "../component/Form.jsx";
import Spinner from "../component/Spinner.jsx";

const initialState = {
  user_name: "",
  name: "",
  last_name: "",
  email: "",
  password: "",
  province: "",
  cif: "",
  address: "",
  cp: "",
};

export const RegisterCompany = () => {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [alert, setAlert] = useState(false);

  // Función que actualiza el user_name basado en el campo email
  const updateUserName = (email) => {
    const userName = email.replace(/\s+/g, ""); // Elimina espacios en blanco
    setForm({...form, user_name: userName});
  };

  // Actualiza el user_name cada vez que el campo email cambia
  useEffect(() => {
    updateUserName(form.email);
  }, [form.email]);

  const handleChange = (e) => {
    const value = e.target.value; //se obtiene el valor del input
    const name = e.target.name; //se obtiene el nombre del campo del input
    setForm({...form, [name]: value}); //se añade el valor al campo de nombre de input haciendo una copia del objeto
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(false);
    await companyRegister(form);
    setForm(initialState);
    setSpinner(false);
    if (companyRegister) {
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
              userType="company"
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
