import React from "react";
import {Link} from "react-router-dom";
import "../../styles/home.css";
import {Navbar} from "../component/navbar.js";

export const Home = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div
        className="container-fluid d-flex justify-content-start"
        id="container"
      >
        <div className="w3-sidebar w3-light-grey w3-bar-block" id="side-bar">
          <div className="container-fluid d-flex justify-content-center mt-5">
            <div className="logo-container">
              <img
                className="logo"
                src={
                  "https://res.cloudinary.com/dcgc2tppo/image/upload/v1685178940/logoweb_np1qti.png"
                }
              ></img>
            </div>
          </div>

          <div className="container-fluid mt-5">
            <h3 className="titulo-side-bar text-center m-5">
              - ¿Qué es Jobs Hood? -
            </h3>
            <p className="texto-side-bar m-4">
              Jobs Hood es una página web que se enfoca en proporcionar
              opiniones y reseñas de empresas, con el objetivo de ayudar a los
              usuarios a tomar decisiones informadas sobre las condiciones y el
              ambiente de trabajo de las empresas que se han registrado en
              nuestra página web.
            </p>
            <p className="texto-side-bar m-4">
              Además, Jobs Hood ofrece una función de contacto con abogados para
              ayudar a los usuarios a obtener asesoramiento legal en caso de
              necesitarlo.
            </p>
            <p className="texto-side-bar m-4">
              No dudes en registrarte para acceder a nuestros servicios.
            </p>
          </div>
        </div>

        <div className="menu">
          <Link className="no-link" to="/companies">
            <div className="row my-5">
              <div className=" cartas-home card m-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src="https://res.cloudinary.com/dcgc2tppo/image/upload/v1685537829/istockphoto-1358416956-612x612_deqwra.jpg"
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body mt-3">
                      <h5 className=" titulo-cards-home card-title">
                        Empresas
                      </h5>
                      <p className="texto-carta card-text">
                        La página web cuenta con una amplia variedad de empresas
                        registradas, desde pequeñas empresas locales hasta
                        grandes corporaciones.
                      </p>

                      <p className="texto-carta card-text">
                        Aquí podrás ver opiniones y valoraciones de sus
                        empleados para poder formarte tu opinión.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link className="no-link" to="/lawyers">
            <div className="row my-5">
              <div className="cartas-home card m-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src="https://res.cloudinary.com/dcgc2tppo/image/upload/v1685537659/istockphoto-1448686771-612x612_xgdwex.jpg"
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body mt-3">
                      <h5 className="titulo-cards-home card-title">Abogados</h5>
                      <p className="texto-carta card-text">
                        {" "}
                        Conéctate con abogados especializados en tu área de
                        interés, podrás consultar cualquier problema legal que
                        pueda surgirte.
                      </p>
                      <p className="texto-carta card-text">
                        Aquí podrás ver opiniones de trabajadores que se han
                        puesto en contacto con nuestros abogados, o hacerles
                        preguntas referentes a tus derechos laborales.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};
