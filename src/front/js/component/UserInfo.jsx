import React from "react";

const UserInfo = ({user, profile, showEditButton, isLawyer, onClick}) => {
  return (
    <div className="row">
      <div className="col-lg-3">
        <img id="imagenContacto" src={user.avatar} />
      </div>
      <div className="col-lg-7">
        <p id="nombre-contacto">
          <strong>{user.name}</strong>
        </p>
        <div className="iconos my-1"> {user.last_name}</div>
        <div className="iconos my-1"> {user.email}</div>
        <div className="iconos my-1"> {profile.address}</div>
        <div className="iconos my-1"> {profile.province}</div>
        {isLawyer ? (
          <div className="iconos my-1"> {profile.col_number}</div>
        ) : (
          <div className="iconos my-1"> {profile.cif}</div>
        )}
        <div>
          <p>{user.description}</p>
        </div>
      </div>
      {showEditButton && (
        <div className="col-lg-2 d-flex">
          <i
            className="fa-solid fa-pen-clip fa-xl mt-3 mx-4"
            title="Editar Contacto"
            onClick={onClick}
          ></i>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
