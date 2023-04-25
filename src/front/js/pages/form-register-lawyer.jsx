import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { registerLawyer } from "../services";  

export const RegistroAbogado = () => {
	const { store, actions } = useContext(Context);

	const [registro, setRegistro] = useState(
		{
			user_name: "",
            password:"",
            name:"",
            last_name:"",
			email: "",
            address: "",
            city: "",
            cp: "",
            col_number: "",
		})


	const handleChange = ({target}) =>{                           // el valor que se escriba en el form se sustituye en el campo name de cada apartado del objeto,
		setRegistro({...registro ,[target.name]:target.value}) // se setean los cambios en el usestate de registro                                                    
	}	

    const handleSubmit = async (event) =>{
		event.preventDefault();
		await registerLawyer(registro)
        // una vez que te registres/login apareces en tu perfil de usuario 
	}

    return (
		<React.Fragment>
		
			<div className="container text-center mt-5">
				<h2>CREAR NUEVA CUENTA</h2>
				<h5>Accede a todos los servicios de Jobs Hood !</h5>
			</div>
			<div className="container mt-5">
				<h4>Datos de Acceso</h4>
				<form onChange={handleChange} onSubmit={handleSubmit}>
					<div className="row align-items-start my-3">
						<div className="col">
							<label htmlFor="form-register-worker" className="form-label">Nombre de Usuario</label>
							<input type="text" className="form-control rounded-0" placeholder="Usuario"  maxLength="20" required />
						</div>
						<div className="col">
							<label  htmlFor="inputPassword6" className="form-label">Contraseña</label>
							<input type="password" className="form-control rounded-0" aria-labelledby="passwordHelpInline" placeholder="Debe tener entre 8-20 caracteres." required />
						</div>
					</div>
                    <div className="row align-items-start my-3">
						<div className="col">
							<label htmlFor="form-register-worker" className="form-label">Nombre</label>
							<input type="text" className="form-control rounded-0"  maxLength="20" required />
						</div>
						<div className="col">
							<label htmlFor="form-register-worker" className="form-label">Apellidos</label>
							<input type="text" className="form-control rounded-0"  maxLength="40"  />
						</div>
					</div>
					<div className="row align-items-end my-3">
						<div className="col">
							<label  htmlFor="form-register-worker" className="form-label">Dirección Email</label>
							<input type="email" className="form-control rounded-0" placeholder="name@example.com" required />
						</div>
					</div>
					<div className="row align-items-end my-3">
						<div className="col">
							<label  htmlFor="form-register-worker" className="form-label">Direccón postal</label>
							<input type="text" className="form-control rounded-0" required />
						</div>
					</div>
					<div className="row align-items-end my-3">
						<div className="col">
							<label  htmlFor="form-register-worker" className="form-label">Ciudad</label>
							<input type="text" className="form-control rounded-0" required />
						</div>
					</div>
					<div className="row align-items-end my-3">
						<div className="col">
							<label  htmlFor="form-register-worker" className="form-label">Código postal</label>
							<input type="number" className="form-control rounded-0" required />
						</div>
					</div>
					<div className="row align-items-end my-3">
						<div className="col">
							<label  htmlFor="form-register-worker" className="form-label">Número de colegiado</label>
							<input type="text" className="form-control rounded-0" required />
						</div>
					</div>
					<input type="submit" className="btn btn-dark mx-3  rounded-0" value="Registrarme"></input>
				</form>
			</div>

		</React.Fragment >

	);
};
