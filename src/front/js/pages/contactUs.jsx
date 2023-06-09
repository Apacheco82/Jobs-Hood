import React, {useState, useRef} from "react";
import emailjs from "@emailjs/browser";
import "../../styles/contactUs.css";
import {Navbar} from "../component/navbar.js";
import Alert from "../component/Alert.jsx";
import Spinner from "../component/Spinner.jsx";

const ContactUs = () => {
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [className, setClassName] = useState("");
  const [spinner, setSpinner] = useState(false);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setSpinner(true)
    emailjs
      .sendForm(
        "service_1kzym2l",
        "template_2kgymgm",
        form.current,
        "FPRO9YG97qhcuxJud"
      )
      .then(
        (result) => {
          setSpinner(false)
          setAlert(true)
          setMessage("Tu correo ha sido enviado con éxito. En breve te responderemos")
          setClassName("success")
          setTimeout(()=>{
            setAlert(false)
          }, 3000)
          //console.log(result.text);
        },
        (error) => {
          setSpinner(false)
          setAlert(true)
          setMessage("Tu mensaje no se ha podido enviar. Inténtalo de nuevo más tarde")
          setClassName("danger")
          setTimeout(()=>{
            setAlert(false)
          }, 3000)
          console.log(error.text);
        }
      );
  };

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <div className="contact-container">
          <Navbar />
          <div className="container d-flex justify-content-center mt-5">
            <h3>Déjanos tu mensaje y nos pondremos en contacto contigo</h3>
          </div>
          {alert && (
              <div className="d-flex justify-content-center m-5">
                <Alert className={className} message={message} />
              </div>
            )}
          <form ref={form} onSubmit={sendEmail} className="card colorful-form">
            <div className="form-group">
              <label className="contact-label">Nombre</label>
              <input
                className="form-input"
                name="user_name"
                required=""
                placeholder="Usuario"
                type="text"
              />
            </div>

            <div className="form-group">
              <label className="contact-label">Correo electrónico</label>
              <input
                className="form-input"
                type="email"
                name="user_email"
                required=""
                placeholder="Email"
              />
            </div>

            <div className="form-group">
              <label className="contact-label">Asunto</label>
              <input
                className="form-input"
                type="text"
                name="subject"
                required=""
                placeholder="Asunto"
              />
            </div>

            <div className="form-group">
              <label className="contact-label">Mensaje</label>
              <textarea
                className="form-input"
                name="message"
                required=""
                placeholder="Escriba su consulta"
              />
            </div>

            <input
              className="send-contact-btn btn-success"
              type="submit"
              value="Enviar"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default ContactUs;
