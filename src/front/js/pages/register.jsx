import React from "react";
import {Link} from "react-router-dom";
import {Navbar} from "../component/navbar.js";
import "../../styles/register.css";

export const Register = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="register">
        <div className="container text-center mt-5">
          <h1> Bienvenido a Jobs Hood!</h1>
          <h3>¿A que area pertenece? </h3>

          <div className="row my-5">
            <div className="col mx-4">
              <Link to="lawyer">
                <div className="card w-100">
                  <div className="card-body">
                    <h5 className="card-title">Registrarme como Abogado/a</h5>
                    <i className="fa-solid fa-gavel fa-2xl"></i>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col mx-4">
              <Link to="worker">
                <div className="card w-100">
                  <div className="card-body">
                    <h5 className="card-title">
                      Registrarme como Trabajador/a
                    </h5>
                    <i className="fa-solid fa-user-group fa-2xl"></i>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col mx-4">
              <Link to="company">
                <div className="card w-100">
                  <div className="card-body">
                    <h5 className="card-title">Registrarme como Empresa</h5>
                    <i className="fa-regular fa-building fa-2xl"></i>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
