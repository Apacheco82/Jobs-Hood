import React, {useState, useContext} from "react";
import {Context} from "../store/appContext.js";
import LinkButton from "../component/LinkButton.jsx";
import {changePassword, editUser} from "../services/user.js";
import Spinner from "../component/Spinner.jsx";
import {useNavigate} from "react-router-dom";
import {checkUser} from "../services/user.js";
import Avatar from "../component/avatar.jsx";
import Alert from "../component/Alert.jsx";
import {Navbar} from "../component/navbar.js";
import Modal from "../component/Modal.jsx";

export const EditProfileWorker = () => {
  const {store, actions} = useContext(Context);
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [className, setClassName] = useState("");
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [editedWorker, setEditedWorker] = useState({
    user_name: store.user.user_name,
    name: store.user.name,
    last_name: store.user.last_name,
    email: store.user.email,
  });
  const [password, setPassword] = useState({
    email: "",
    old_password: "",
    new_password: "",
    password_check: "",
  });
  const [show, setShow] = useState(false);
  const [small, setSmall] = useState(false);
  const [passWrong, setPassWrong] = useState(false);
  const [passOk, setPassOk] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  const handleChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (reader.readyState === 2) {
          //console.log("result", reader.result);
          setFileUrl(reader.result);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      const {name, value} = event.target;
      setEditedWorker((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    setSpinner(true);
    event.preventDefault();
    let check;
    let mail = false;
    if (store.user.email !== editedWorker.email) {
      // si el email ha cambiado
      check = await checkUser(editedWorker, "editMail"); // el parametro para editar
      mail = true;
    } else if (store.user.user_name !== editedWorker.user_name) {
      //si el user_name ha cambiado
      check = await checkUser(editedWorker, "editUserName"); // el parametro para editar
    }
    if (check) {
      if (!check.error) {
        try {
          const response = await editUser(editedWorker, file);
          if (response) {
            console.log("laresponse", response);
            if (mail) {
              localStorage.setItem("token", response); // Guardamos el nuevo token en el localStorage
            }
            setAlert(true);
            setClassName("success");
            setMessage("Usuario editado correctamente");
            setTimeout(() => {
              setAlert(false);
              navigate("/worker/profile");
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
      // si no cambia ni email ni user_name
      try {
        const response = await editUser(editedWorker, file);
        if (response) {
          setAlert(true);
          setClassName("success");
          setMessage("Usuario editado correctamente");
          setTimeout(() => {
            setAlert(false);
            navigate("/worker/profile");
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
    }
  };

  const passwordChange = ({target}) => {
    setPassword({...password, [target.name]: target.value});
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    password.email = store.user.email;
    if (password.new_password == password.password_check) {
      //si el password nuevo coincide con la repeticion
      try {
        const response = await changePassword(password);
        if (!response.error) {
          setPassOk(true)
          console.log(response)
          setTimeout(() => {
            setPassOk(false)
            setShow(false)
          }, 2000);
        }else{
          setPassWrong(true)
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setSmall(true);
      setTimeout(() => {
        setSmall(false);
      }, 2000);
    }
  };


  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>
          <Navbar />
          <div className="container my-5">
            {" "}
            <h1> Edición de Usuario</h1>
            <form onSubmit={handleSubmit}>
              <div className="row my-3">
                <div className="col">
                  <Avatar
                    handleChange={handleChange}
                    fileUrl={fileUrl}
                    file={file}
                  />
                </div>
              </div>
              {alert && (
                <div className="d-flex justify-content-center m-5">
                  <Alert className={className} message={message} />
                </div>
              )}
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

              <div className="d-flex mb-2">
                <input
                  type="submit"
                  className="btn btn-dark mx-3  rounded-0"
                  value="Guardar Cambios"
                ></input>
                <LinkButton direction="/worker/profile" text="Cancelar" />
              </div>
            </form>
            <Modal
              handlePassword={handlePassword}
              passwordChange={passwordChange}
              show={show}
              handleShow={handleShow}
              small={small}
              passWrong={passWrong}
              passOk={passOk}
            />
          </div>
        </>
      )}
    </>
  );
};
