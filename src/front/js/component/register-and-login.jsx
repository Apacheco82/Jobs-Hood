import React from "react";
import { Link } from "react-router-dom";

const ButtonsNavbar = () => {
    return (
        <>
            <ul className="navbar-nav d-flex gap-5 me-2 mb-2 mb-lg-0">
                <Link to="/register">
                    <button type="button" className="btn-navbar d-flex ">
                        <span className="material-symbols-outlined mx-1">
                            person_add
                        </span>Registrarme
                    </button>
                </Link>

                <Link to="/login">
                    
                    <button type="button" className="btn-navbar d-flex ">
                    <span className="material-symbols-outlined mx-1">login</span> Iniciar sesión
                    </button>
                </Link>
            </ul>
        </>
    );
};

export default ButtonsNavbar;
