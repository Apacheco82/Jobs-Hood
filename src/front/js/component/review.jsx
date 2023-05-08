import React from "react";
import ReactStars from "react-rating-stars-component";

const Review = (props) => {
  return (
    <div className="col-8 mt-2 d-flex justify-content-center">
      <div className="card" style={{width: "50rem"}}>
        <ReactStars
          value={props.rating}
          count={5}
          size={24}
          edit={false}
          activeColor="#ffd700"
        />
        <p className="card-text">{props.text}</p>
        <p className="card-text">{props.user_name}</p>
        <p className="card-text">{props.data}</p>
      </div>
    </div>
  );
};

export default Review;
