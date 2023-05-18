import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Province } from "../component/form-province.jsx";
import LinkButton from "../component/LinkButton.jsx";
import { editCompany } from "../services/company.js";
import Spinner from "../component/Spinner.jsx";
import { useNavigate } from "react-router-dom";




export const EditProfileCompany = () => {


    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [spinner, setSpinner] = useState(false);

    const [editedCompany, setEditedCompany] = useState({
        name: store.user.name,
        email: store.user.email,
        address: store.user.company.address,
        province: store.user.company.province,
    });


    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditedCompany((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        setSpinner(true)
        event.preventDefault();
        await editCompany(editedCompany);
        setEditedCompany(store.user)
        setSpinner(false)
        navigate("/company/profile")
        

    };


    return (
        <>
            {spinner ? (<Spinner />) : (
                <div className="container my-5"> <h1> Edición de Usuario</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="row align-items-start my-3">

                            <div className="col">
                                <label htmlFor="form-register-company" className="form-label">
                                    Nombre de la Empresa
                                </label>
                                <input
                                    onChange={handleChange}
                                    defaultValue={store.user.name}
                                    type="text"
                                    name="name"
                                    title="Please enter a valid name"
                                    className="form-control rounded-0"
                                    maxLength="80"
                                />
                            </div>

                            <div className="col">
                                <label htmlFor="form-register-company" className="form-label">
                                    Dirección
                                </label>
                                <input
                                    onChange={handleChange}
                                    defaultValue={store.user.company.address}
                                    type="text"
                                    name="address"
                                    className="form-control rounded-0"
                                    maxLength="100"

                                />
                            </div>
                        </div>
                        <div className="row align-items-start my-3">
                            <div className="col">
                                <label htmlFor="form-register-company" className="form-label">
                                    Dirección Email
                                </label>
                                <input
                                    onChange={handleChange}
                                    defaultValue={store.user.email}
                                    type="email"
                                    name="email"
                                    className="form-control rounded-0"
                                    maxLength="250"
                                />
                            </div>
                        </div>
                        <div className="row align-items-end my-3">
                            <div className="col">

                                <label htmlFor="form-register-company" className="form-label">
                                    Provincia
                                </label>
                                <Province handleChange={handleChange} name="province" />

                            </div>

                        </div>
                        <div className="d-flex">
                            <input
                                type="submit"
                                className="btn btn-dark mx-3  rounded-0"
                                value="Guardar Cambios"
                            ></input>
                            <LinkButton direction="/company/profile" text="Cancelar" />
                        </div>

                    </form>
                </div>
            )}


        </>
    )
}