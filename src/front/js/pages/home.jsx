import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import LogoWeb from "/workspace/Jobs-Hood/src/front/img/logoweb.png"

export const Home = () => {


	return (
		<React.Fragment>
			<div className="container-fluid d-flex" id="container">
				<div className="w3-sidebar w3-light-grey w3-bar-block" id="side-bar">
				<img id="logo" src={LogoWeb}></img>
					<h3>¿Qué es Jobs Hood?</h3>
					<p>Jobs Hood es una página web que se enfoca en proporcionar opiniones y reseñas de empresas, con el objetivo de ayudar a los usuarios a tomar decisiones informadas sobre dónde trabajar o hacer negocios.</p>
					<p>Además, Jobs Hood ofrece una función de contacto con abogados para ayudar a los usuarios a obtener asesoramiento legal en caso de necesitarlo.</p>
				</div>
				<div className="menu">
					<div className="row">
						<div className="col">
							<div className="card mb-3" style={{width: "60rem"}}>
								<div className="row g-0">
									<div className="col-md-4">
										<img src="https://media.istockphoto.com/id/1385097502/es/foto/foto-de-hombres-de-negocios-d%C3%A1ndose-la-mano-durante-una-reuni%C3%B3n-de-equipo-en-una-oficina.jpg?s=612x612&w=0&k=20&c=pPk1OBjVpfZrfwgWRqsLuz_Ri_BDnDE8O4bxM7074n0=" className="img-fluid rounded-start" alt="..."/>
									</div>
									<div className="col-md-8">
										<div className="card-body">
											<h5 className="card-title">Empresas</h5>
											<p className="card-text">La página web cuenta con una amplia variedad de empresas registradas, desde pequeñas empresas locales hasta grandes corporaciones.</p>
											
											<Link to="/companies">
											<button type="button" className="btn btn-outline-success"> Más Informacion</button>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row my-5">
						<div className="col">
							<div className="card mb-3" style={{width: "60rem"}}>
								<div className="row g-0">
									<div className="col-md-4">
										<img src="https://media.istockphoto.com/id/1388925257/es/foto/el-cliente-est%C3%A1-explicando-la-ofensa-a-un-abogado-y-trabajando-juntos-para-resolver-la-ofensa.jpg?s=612x612&w=0&k=20&c=8dRYnC2AMJtQrXYyZlSmcJHT8Fi4L8iobT_UK_ojyeQ=" className="img-fluid rounded-start" alt="..."/>
									</div>
									<div className="col-md-8">
										<div className="card-body">
											<h5 className="card-title">Abogados</h5>
											<p className="card-text"> Conéctate con abogados especializados en tu área de interés, podrás consultar cualquier problema legal que pueda surgirte.</p>
											
											<Link to="/lawyers">
											<button type="button" className="btn btn-outline-success">Más Informacion</button>
											</Link>
											
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				
				</div>
			</div>
		</React.Fragment>
	);
};
