import React, {useState, useContext} from "react";
import {Context} from "../store/appContext.js";
import {Province} from "../component/form-province.jsx";
import LinkButton from "../component/LinkButton.jsx";
import {editLawyer} from "../services/lawyer.js";
import Spinner from "../component/Spinner.jsx";
import Avatar from "../component/avatar.jsx";
import {useNavigate} from "react-router-dom";
import {checkUser} from "../services/user.js";
import Alert from "../component/Alert.jsx";
import { Navbar } from "../component/navbar.js";

export const EditProfileLawyer = () => {
  const {store, actions} = useContext(Context);
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [className, setClassName] = useState("");
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [editedLawyer, setEditedLawyer] = useState({
    name: store.user.name,
    email: store.user.email,
    address: store.user.lawyer.address,
    province: store.user.lawyer.province,
    col_number: store.user.lawyer.col_number,
  });

  const handleChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (reader.readyState === 2) {
          setFileUrl(reader.result);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
    const {name, value} = event.target;
    setEditedLawyer((prevState) => ({
      ...prevState,
      [name]: value,
    }))}
  };


  const handleSubmit = async (event) => {
    setSpinner(true);
    event.preventDefault();
    if (store.user.email !== editedLawyer.email) {
      //si el email ha cambiado
      const check = await checkUser(editedLawyer, "edit"); //el parametro para editar
      
      if (!check.error) {
        try {
          const response = await editLawyer(editedLawyer, file);
          
          if (response) {
            localStorage.setItem("token", response); // Guardamos el nuevo token en el localStorage.
            setAlert(true);
            actions.setUser(editedLawyer)
            setClassName("success");
            setMessage("Usuario editado correctamente");
            setTimeout(() => {
              setAlert(false);
              navigate("/lawyer/profile");
            }, 3000);
            setSpinner(false);
          }
        } catch (error) {
          setSpinner(false);
          setAlert(true);
          setClassName("danger");
          setMessage("Error del servidor");
          setTimeout(() => {
            setAlert(false);
          }, 3000);
        }
      } else {
        setSpinner(false);
        setAlert(true);
        setClassName("danger");
        setMessage(check.msg);
      }
    } else {
      //si no cambia el email
      try {
        const response = await editLawyer(editedLawyer,file);
        setEditedLawyer(store.user);
        setSpinner(false);
        setAlert(true);
        setClassName("success");
        setMessage("Usuario editado correctamente");
        setTimeout(() => {
          setAlert(false);
          navigate("/lawyer/profile");
        }, 3000);
      } catch (error) {
        setSpinner(false);
        setAlert(true);
        setClassName("danger");
        setMessage("Error del servidor");
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      }
    }
  };

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>
        <Navbar/>
        <div className="container my-5">
          {" "}
          <h1> Edición de Usuario</h1>
          <div className="col-4">
            <div>
              <img src={store.user.avatar} />
            </div>
            <Avatar  handleChange={handleChange} fileUrl={fileUrl} file={file}/>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row my-3"></div>
            {alert && (
              <div className="d-flex justify-content-center m-5">
                <Alert className={className} message={message} />
              </div>
            )}
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
            <div className="rom my-3">
              <div className="col">
                <label htmlFor="form-register-lawyer" className="form-label">
                  Descripción
                </label>
                <textarea 
                    onChange={handleChange}
                    name="description"
                    defaultValue={store.user.description}
                    className="form-control">
                  </textarea>
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
        </>
      )}
    </>
  );
};
