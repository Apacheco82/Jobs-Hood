import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {


	return (
		<React.Fragment>
			<div className="container-fluid d-flex" id="container">
				<div className="w3-sidebar w3-light-grey w3-bar-block" id="side-bar">
				<img id="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqqEpOXa576G71buDP7GFDaFvbknHumld_4g&usqp=CAU"></img>
					<h3>Joobs Hood</h3>
					<p>¿Qué es Jobs Hood?</p>
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
											<p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
											<p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
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
											<p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
											<p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
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
