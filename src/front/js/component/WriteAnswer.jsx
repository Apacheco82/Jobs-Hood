import React, {useState, useContext} from "react";
import {Context} from "../store/appContext.js";

const WriteAnswer = ({answerChange, answerSubmit, questionId}) => {
  const {store, actions} = useContext(Context);
  const [view, setView] = useState(false);


  const openForm = () => {
    setView(!view);
    actions.setQuestionId(questionId);
  };


  return (
    <>
      <div className="container container-answer mt-2 container-fluid d-flex justify-content-start">
      {!view ? (
        <button onClick={openForm} type="button" className="btn btn-success">
          Responder
        </button>
      ) : (
        <button onClick={openForm} type="button" className="btn btn-secondary">
          Cerrar
        </button>
      )}
      </div>
      <div className="container container-answer d-flex justify-content-start mt-2">
      {view && (
        <form
          action=""
          className=""
          onChange={answerChange}
          onSubmit={answerSubmit}
        >
      
            <div className="card card-stars d-flex justify-content-start">
              <div className="card-body">
                <label htmlFor="valoracion" className="form-label">
                  Responder al usuario
                </label>
                <textarea
                  name="text"
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  maxLength="700"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success">
                Enviar
              </button>{" "}
            </div>
         
        </form>
      )}
      </div>
    </>
  );
};

export default WriteAnswer;
