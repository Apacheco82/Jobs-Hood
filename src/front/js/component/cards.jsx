import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "../../styles/card.css";

const Cards = ({ avatar, name, province, email, address, category, id, averageRating }) => {
  return (
    <div className="col-4 mt-1">
      <div className="all-cards-view card" style={{ width: "17rem" }}>
        <img className="card-img-top" src={avatar} alt="Card image cap"></img>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <div>
            <ReactStars
              count={5}
              size={24}
              activeColor="#ffd700"
              color="#ddd"
              edit={false}
              isHalf={true}
              value={averageRating}
            />
          </div>
          <p className="card-text">{address}</p>
          <p className="card-text">{province}</p>
          <p className="card-text">{email}</p>

          <Link to={`/${category}/${id}`}>
            <button type="button" className="btn btn-success">
              Info
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
