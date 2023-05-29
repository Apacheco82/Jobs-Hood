import React from "react";

const UserWorker = ({user, userPrivate, showEditButton, onClick}) => {
  return (
    <div className="row">
      <div className="col-lg-3">
        <img id="imagenContacto" src={user.avatar} />
      </div>
      <div className="col-lg-7">
        <p id="nombre-contacto">
          <strong>{user.user_name}</strong>
          {userPrivate && (
          <>
            <div className="iconos my-1"> {user.name}</div>
            <div className="iconos my-1"> {user.last_name}</div>
            <div className="iconos my-1"> {user.email}</div>
          </>
        )}
          <div>
            <p>{user.description}</p>
          </div>
        </p>
        
      </div>
      {showEditButton && (
        <div className="col-lg-2 d-flex">
          <i
            className="fa-solid fa-pen-clip fa-xl mt-3 mx-4"
            onClick={onClick}
            title="Editar Contacto"
          ></i>
        </div>
      )}
    </div>
  );
};

export default UserWorker;
