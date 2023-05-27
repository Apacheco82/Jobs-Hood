import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "../../styles/contactUs.css";
import {Navbar} from "../component/navbar.js";

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {

    emailjs.sendForm('service_1kzym2l', 'template_2kgymgm', form.current, 'FPRO9YG97qhcuxJud')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <> <Navbar/>
    <form ref={form} onSubmit={sendEmail} className="colorful-form">
      <div className="form-group" >
        <label className="form-label">Nombre de usuario</label>
        <input className="form-input" name="user_name" required="" placeholder="Usuario" type="text" />
      </div>

      <div className="form-group" >
        <label className="form-label">Correo electrónico</label>
        <input className="form-input" type="email" name="user_email" required="" placeholder="Email"/>
      </div>
      
      <div className="form-group" >
        <label className="form-label">Asunto</label>
        <input className="form-input" type="text" name="subject" required="" placeholder="Asunto"/>
      </div>
      
      <div className="form-group" >
        <label className="form-label">Mensaje</label>
        <textarea className="form-input" name="message" required="" placeholder="Escriba su consulta"/>
      </div>
      
      <input className="form-button" type="submit" value="Enviar" />
    </form>
    </>
  );
};

export default ContactUs; 