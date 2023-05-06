import React, { Component } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa"; /* Para tener acceso a React-icons ejecutamos "npm install react-icons --save" */
import { FaLinkedin } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa";
import "../../styles/footer.css";



export const Footer = () => (
	
<footer>
		<div className="container">
		<div className="d-flex pt-4 pb-4 footer_body fixed-bottom">
				<div className="social">
					<div className="icon-circle text-center d-flex gap-3">
						<a href="#"><FaFacebookF className="ico facebook"/></a>
						<a href="#"><FaTwitter className="ico twitter"/></a>
						<a href="#"><FaLinkedin className="ico linkedin"/></a>
						<a href="#"><FaGooglePlusG className="ico google"/></a>
					</div>				
				</div>

				<div className="priv_contact">
					<div className="privacy">
						<a href="#"><h4>Política de privacidad</h4></a> 
					</div>

					<div className="contact">
						<a href="#"><h4>Contacto</h4></a>  
					</div>
				</div>

			</div>
		</div>
</footer>
	
);
