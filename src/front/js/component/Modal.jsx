import React from "react";

const Modal = ({handlePassword, passwordChange, handleShow, show, small, passWrong, passOk, error}) => {
  return (
    <>
      <div className="d-flex">
        <button type="button" className="btn btn-success" onClick={handleShow}>
          Cambiar contraseña
        </button>
      </div>

      {show && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cambio de contraseña</h5>
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={handleShow}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onChange={passwordChange}>
                {error &&(<h6 className="text-danger">La nueva contraseña debe tener 8 caracteres</h6>)}
                {passWrong &&(<h6 className="text-danger">Contraseña no válida</h6>)}
                {passOk &&(<h6 className="text-success">Contraseña cambiada</h6>)}
                  <label htmlFor="inputPassword6" className="form-label">
                    Su contraseña
                  </label>
                  <input
                    type="password"
                    name="old_password"
                    className="form-control rounded-0"
                    aria-labelledby="passwordHelpInline"
                    placeholder="Debe tener entre 8-20 caracteres."
                    minLength="8"
                    maxLength="20"
                    required
                  />
                  <label htmlFor="inputPassword6" className="form-label">
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    name="new_password"
                    className="form-control rounded-0"
                    aria-labelledby="passwordHelpInline"
                    placeholder="Debe tener entre 8-20 caracteres."
                    minLength="8"
                    maxLength="20"
                    required
                  />
                  <label htmlFor="inputPassword6" className="form-label">
                    Repita su nueva contraseña
                  </label>
                  <input
                    type="password"
                    name="password_check"
                    className="form-control rounded-0"
                    aria-labelledby="passwordHelpInline"
                    placeholder="Debe tener entre 8-20 caracteres."
                    minLength="8"
                    maxLength="20"
                    required
                  />
                  {small && (
                    <small id="emailHelp" class="form-text text-danger">
                      Las contraseñas no coinciden
                    </small>
                  )}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleShow}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handlePassword}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
