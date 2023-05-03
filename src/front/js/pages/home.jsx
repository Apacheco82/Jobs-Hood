import React from "react";
import "../../styles/home.css";

export const Home = () => {


	return (
		<React.Fragment>
			<div className="container-fluid d-flex" id="container">
				<div className="w3-sidebar w3-light-grey w3-bar-block" id="side-bar">
					<h3 class="w3-bar-item">Joobs Hood</h3>
					<img></img>
					<p>¿Qué es Jobs Hood?</p>
				</div>

				<div className="menu">
					<div class="row">
						<div class="col">
							<div class="card mb-3" style={{width: "60rem"}}>
								<div class="row g-0">
									<div class="col-md-4">
										<img src="..." class="img-fluid rounded-start" alt="..."/>
									</div>
									<div class="col-md-8">
										<div class="card-body">
											<h5 class="card-title">Card title</h5>
											<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
											<p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
											<button type="button" class="btn btn-outline-success">El buscador </button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<div class="card mb-3" style={{width: "60rem"}}>
								<div class="row g-0">
									<div class="col-md-4">
										<img src="..." class="img-fluid rounded-start" alt="..."/>
									</div>
									<div class="col-md-8">
										<div class="card-body">
											<h5 class="card-title">Card title</h5>
											<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
											<p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
											<button type="button" class="btn btn-outline-success">el listado de empresas</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<div class="card mb-3"  style={{width: "60rem"}}>
								<div class="row g-0">
									<div class="col-md-4">
										<img src="..." class="img-fluid rounded-start" alt="..."/>
									</div>
									<div class="col-md-8">
										<div class="card-body">
											<h5 class="card-title">Card title</h5>
											<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
											<p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
											<button type="button" class="btn btn-outline-success">los abogados</button>
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
