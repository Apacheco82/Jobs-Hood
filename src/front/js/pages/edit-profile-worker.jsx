import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Province } from "../component/form-province.jsx";
import LinkButton from "../component/LinkButton.jsx";
import { editUser } from "../services/user.js";
import Spinner from "../component/Spinner.jsx";
import { useNavigate} from "react-router-dom";
import {checkUser} from "../services/user.js";
import Avatar from "../component/avatar.jsx";




export const EditProfileWorker = () => {


  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);

  const [editedWorker, setEditedWorker] = useState({
    user_name: store.user.user_name,
    name: store.user.name,
    last_name: store.user.last_name,
    email: store.user.email,
    
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedWorker((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    setSpinner(true);
    event.preventDefault();
    if (store.user.email !== editedWorker.email) {//si el email ha cambiado
      const check = await checkUser(editedWorker, "edit"); //el parametro para editar
      if (!check.error) {
        const response = await editUser(editedWorker);
        // Guardamos el nuevo token en el localStorage
        localStorage.setItem("token", response);
        setSpinner(false);
        navigate("/worker/profile");
      } else {
        //mensaje de error si falla CHECK
      }
    } else {//si no cambia el email
      await editUser(editedWorker);
      setEditedCompany(store.user);
      setSpinner(false);
      navigate("/worker/profile");
    }
  };

  return (
    <>
      {spinner ? (<Spinner />) : (
        <div className="container my-5"> <h1> Edición de Usuario</h1>
          <form onSubmit={handleSubmit}>
            <div className="row my-3">
              <div className="col">
                <Avatar />
              </div>
            </div>
            <div className="row align-items-start my-3">

              <div className="col">
                <label htmlFor="form-register-company" className="form-label">
                  Nombre de Usuario
                </label>
                <input
                  onChange={handleChange}
                  defaultValue={store.user.user_name}
                  type="text"
                  name="user_name"
                  title="Please enter a valid name"
                  className="form-control rounded-0"
                  maxLength="20"
                />
              </div>

              <div className="col">
                <label htmlFor="form-register-company" className="form-label">
                  Nombre
                </label>
                <input
                  onChange={handleChange}
                  defaultValue={store.user.name}
                  type="text"
                  name="name"
                  className="form-control rounded-0"
                  maxLength="30"

                />
              </div>
            </div>
            <div className="row align-items-start my-3">
              <div className="col">
                <label htmlFor="form-register-company" className="form-label">
                  Apellidos
                </label>
                <input
                  onChange={handleChange}
                  defaultValue={store.user.last_name}
                  type="text"
                  name="last_name"
                  className="form-control rounded-0"
                  maxLength="100"
                />
              </div>
            </div>
            <div className="row align-items-end my-3">
            
              <div className="col">
                <label htmlFor="form-register-company" className="form-label">
                 Dirección Email
                </label>
                <input
                  onChange={handleChange}
                  defaultValue={store.user.email}
                  type="email"
                  name="email"
                  className="form-control rounded-0"
                  maxLength="250"

                />
              </div>
            </div>
            <div className="d-flex">
              <input
                type="submit"
                className="btn btn-dark mx-3  rounded-0"
                value="Guardar Cambios"
              ></input>
              <LinkButton direction="/worker/profile" text="Cancelar" />
            </div>

          </form>
        </div>

      )}

    </>
  )
}