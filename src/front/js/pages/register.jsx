import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar.js";
import "../../styles/register.css";

export const Register = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="register">
        <div className="container text-center mt-5">
          <h1> Bienvenido a <strong>Jobs Hood!</strong> </h1>
          <h3>¿A que area pertenece? </h3>

          <div className="row my-5 ">
            <div className="col mx-4">
              <Link to="lawyer">
                <div id="card" className="card w-100">
                  <div className="card-body">
                    <h5 className="card-title">Soy un Abogado/a</h5>
                    <span id="iconos" className="material-symbols-outlined">
                      balance
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col mx-4">
              <Link to="worker">
                <div id="card" className="card w-100">
                  <div className="card-body">
                    <h5 className="card-title ">
                      Soy un Trabajador/a
                    </h5>
                    <span id="iconos" className="material-symbols-outlined">
                      group
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col mx-4">
              <Link to="company">
                <div id="card" className="card w-100">
                  <div className="card-body">
                    <h5 className="card-title"> Soy una  Empresa</h5>
                    <span id="iconos" className="material-symbols-outlined">
                      apartment
                    </span>
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
