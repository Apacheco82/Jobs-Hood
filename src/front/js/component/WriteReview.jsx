import React, {useState} from "react";
import "../../styles/opinion.css";

const WriteReview = ({reviewChange, reviewSubmit}) => {
  const [view, setView] = useState(false);

  const openForm = () => {
    setView(!view);
  };

  return (
    <>
      <div className="container container-fluid d-flex justify-content-center">
        {!view ? (
          <button onClick={openForm} type="button" className="btn btn-success">
            Deja tu valoración
          </button>
        ) : (
          <button
            onClick={openForm}
            type="button"
            className="btn btn-secondary"
          >
            Cerrar
          </button>
        )}
      </div>

      <div className="container d-flex justify-content-center">
        {view && (
          <form
            style={{width: "100%"}}
            action=""
            className="d-flex justify-content-center"
            onChange={reviewChange}
            onSubmit={reviewSubmit}
          >
            <div className="card card-stars p-3 mt-1">
              <div className="stars">
                <input id="radio1" type="radio" name="rating" value="5" />
                <label htmlFor="radio1">★</label>
                <input id="radio2" type="radio" name="rating" value="4" />
                <label htmlFor="radio2">★</label>
                <input id="radio3" type="radio" name="rating" value="3" />
                <label htmlFor="radio3">★</label>
                <input id="radio4" type="radio" name="rating" value="2" />
                <label htmlFor="radio4">★</label>
                <input id="radio5" type="radio" name="rating" value="1" />
                <label htmlFor="radio5">★</label>
              </div>
              <div className="mb-3">
                <label htmlFor="valoracion" className="form-label">
                  Cuéntales a los demás usuarios tu opinión
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

export default WriteReview;
