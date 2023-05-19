import React, {  useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Province } from "../component/form-province.jsx";
import LinkButton from "../component/LinkButton.jsx";
import { editLawyer } from "../services/lawyer.js";
import Spinner from "../component/Spinner.jsx";
import Avatar from "../component/avatar.jsx"
import { useNavigate } from "react-router-dom";
import {checkUser} from "../services/user.js";


export const EditProfileLawyer = () => {

  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);

  const [editedLawyer, setEditedLawyer] = useState({
    name: store.user.name,
    email: store.user.email,
    address: store.user.lawyer.address,
    province: store.user.lawyer.province,
    col_number: store.user.lawyer.col_number
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedLawyer((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    setSpinner(true);
    event.preventDefault();
    if (store.user.email !== editedLawyer.email) {//si el email ha cambiado
      const check = await checkUser(editedLawyer, "edit"); //el parametro para editar
      if (!check.error) {
        const response = await editLawyer(editedLawyer);
        // Guardamos el nuevo token en el localStorage
        localStorage.setItem("token", response);
        setSpinner(false);
        navigate("/lawyer/profile");
      } else {
        //mensaje de error si falla CHECK
      }
    } else {//si no cambia el email
      await editLawyer(editedLawyer);
      setEditedLawyer(store.user);
      setSpinner(false);
      navigate("/lawyer/profile")
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
                <label htmlFor="form-register-lawyer" className="form-label">
                  Nombre del abogado o Buffette
                </label>
                <input
                  onChange={handleChange}
                  defaultValue={store.user.name}
                  type="text"
                  name="name"
                  title="Please enter a valid name"
                  className="form-control rounded-0"
                  maxLength="80"
                />
              </div>

              <div className="col">
                <label htmlFor="form-register-lawyer" className="form-label">
                  Dirección
                </label>
                <input
                  onChange={handleChange}
                  defaultValue={store.user.lawyer.address}
                  type="text"
                  name="address"
                  className="form-control rounded-0"
                  maxLength="100"

                />
              </div>
            </div>
            <div className="row align-items-start my-3">
              <div className="col">
                <label htmlFor="form-register-lawyer" className="form-label">
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
            <div className="row align-items-end my-3">
              <div className="col">

                <label htmlFor="form-register-lawyer" className="form-label">
                  Provincia
                </label>
                <Province handleChange={handleChange} name="province" />

              </div>

            </div>
            <div className="d-flex">
              <input
                type="submit"
                className="btn btn-dark mx-3  rounded-0"
                value="Guardar Cambios"
              ></input>
              <LinkButton direction="/lawyer/profile" text="Cancelar" />
            </div>

          </form>
        </div>

      )}

    </>
  )
}