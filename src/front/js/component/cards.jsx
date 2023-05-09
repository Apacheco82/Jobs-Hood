import React from "react";
import {Link} from "react-router-dom";


const cards = (props) => {

  return (

<div className="col-4 mt-2">
<div className="card" style={{width: "18rem"}}>
        <img className="card-img-top" src="..." alt="Card image cap"></img>
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">
            {props.address}
          </p>
          <p className="card-text">{props.province}
            </p>
            <p className="card-text">{props.cp}</p>
            <p className="card-text">{props.email}</p>
            <p className="card-text">{props.cif}</p>

            <Link to={`/${props.category}/${props.id}`}>
            <button type="button" className="btn btn-success">
              Info
            </button>
          </Link>

        </div>
      </div>
</div>

  );
};

export default cards;
