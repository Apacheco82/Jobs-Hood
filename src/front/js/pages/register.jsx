import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar.js";
import "../../styles/register.css";

const Card = ({ link, title, icon }) => (
  <div className="col mx-4">
    <Link to={link}>
      <div className="card w-100">
        <div className="card-body card-register d-flex flex-column align-items-center justify-content-center">
          <h4 className="card-title mb-3">{title}</h4>
          <span className={`material-symbols-outlined icon-large`}>{icon}</span>
        </div>
      </div>
    </Link>
  </div>
);

export const Register = () => {
  return (
    <div className="register">
    <Navbar />
    <div className="container text-center mt-5">
      <h1 id="titulo-principal">Bienvenido a <strong id="titulo-web">Jobs Hood!</strong></h1>
      <h3 className="mt-3" id="titulo-secundario">¿A qué área pertenece?</h3>

      <div className="row">
        <Card link="lawyer" title="Soy un Abogado/a" icon="balance" />
        <Card link="worker" title="Soy un Trabajador/a" icon="group" />
        <Card link="company" title="Soy una Empresa" icon="apartment" />
      </div>
    </div>
  </div>
  );
};
