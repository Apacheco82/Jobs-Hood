import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Province } from "../component/form-province.jsx";
import LinkButton from "../component/LinkButton.jsx";
import { editUser } from "../services/user.js";
import Spinner from "../component/Spinner.jsx";




export const EditProfileWorker = () => {


  const { store, actions } = useContext(Context);
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
    setSpinner(true)
    event.preventDefault();
    await editUser(editedWorker);
    setEditedWorker(store.user)
    setSpinner(false)
  };


  return (
    <>
      {spinner ? (<Spinner />) : (
        <div className="container my-5"> <h1> Edición de Usuario</h1>
          <form onSubmit={handleSubmit}>
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