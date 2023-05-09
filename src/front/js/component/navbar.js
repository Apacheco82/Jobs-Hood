import React from "react";
import { Link } from "react-router-dom";
import LogoWeb from "/workspace/Jobs-Hood/src/front/img/logoweb.png"
import "../../styles/navbar.css"


export const Navbar = () => {
	return (
		
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<Link to="/">
					<img src={LogoWeb} className="logo-web"></img>
				</Link>
				
				<ul className="navbar-nav d-flex gap-5 me-2 mb-2 mb-lg-0">
					<Link to="/register">
					<button type="button" className="btn-navbar"><i class="fa-solid fa-bookmark mx-1"></i> Registrarme</button>
					</Link>
					

					<Link to="/login">
						<button type="button" className="btn-navbar"><i class="fa-solid fa-user mx-2 fa-lg"></i>Iniciar sesión</button>
					</Link>
					
				</ul>
				
			</div>
</nav>
	);
};
