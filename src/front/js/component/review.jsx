import React from "react";
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Review = (props) => {
  
  return (
    <div className="col-8 mt-2 d-flex justify-content-center">
      <div className="card card-stars">
        <ReactStars
          value={props.rating}
          count={5}
          size={24}
          edit={false}
          activeColor="#ffd700"
        />
        <p className="card-text">{props.text}</p>
        <Link to={`/worker/${props.userID}`}>
          <p className="card-text">{props.user_name}</p>
        </Link>
        {props.opinion && (
          <Link to={`/${props.type}/${props.receiver_id}`}>
            <p className="card-text">Ver Opinión</p>
          </Link>
        )}

        <p className="card-text">{props.data}</p>
      </div>
    </div>
  );
};

export default Review;
