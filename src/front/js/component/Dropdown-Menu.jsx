import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DropdownMenu = () => {

    const navigate = useNavigate();

    const ProfilePage = () => {
       let roles = localStorage.getItem("role")
       if(roles =="User"){
        navigate("/worker/profile")
       }
       else if(roles =="Lawyer"){
        navigate("/lawyer/profile")
       }
       else{navigate("/company/profile")}
    }

    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/")
        window.location.reload()

    };

    return (
        <>
            <div className="dropdown me-4">
                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-bars"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li onClick={ProfilePage}><p className="dropdown-item"><i className="fa-regular fa-user"></i> Mi perfil </p></li>
                    <li onClick={handleLogout}><p className="dropdown-item" > Cerrar Sesión <i className="fa-solid fa-right-from-bracket"></i> </p></li>

                </ul>
            </div>
        </>

    );
};

export default DropdownMenu;
