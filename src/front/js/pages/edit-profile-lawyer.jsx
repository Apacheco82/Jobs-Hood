
import React, {  useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Province } from "../component/form-province.jsx";
import LinkButton from "../component/LinkButton.jsx";
import { editLawyer } from "../services/lawyer.js";
import Spinner from "../component/Spinner.jsx";
import Avatar from "../component/avatar.jsx"





export const EditProfileLawyer = () => {


  const { store, actions } = useContext(Context);
  const [spinner, setSpinner] = useState(false);

  const [editedLawyer, setEditedLawyer] = useState({
    name: store.user.name,
    email: store.user.email,
    address: store.user.lawyer.address,
    province: store.user.lawyer.province,
    cp: store.user.lawyer.cp
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
    await editLawyer(editedLawyer);
    setEditedLawyer(store.user);
    setSpinner(false);
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
                <label htmlFor="form-register-company" className="form-label">
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
            <div className="row align-items-end my-3">
              <div className="col">

                <label htmlFor="form-register-company" className="form-label">
                  Provincia
                </label>
                <Province handleChange={handleChange} name="province" />

              </div>

              <div className="col">
                <label htmlFor="form-register-company" className="form-label">
                  Código postal
                </label>
                <input
                  onChange={handleChange}
                  defaultValue={store.user.lawyer.cp}
                  type="text"
                  name="cp"
                  className="form-control rounded-0"
                  maxLength="5"

                />
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