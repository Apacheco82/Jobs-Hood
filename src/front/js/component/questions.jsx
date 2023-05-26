import React from "react";
import {Link} from "react-router-dom";

const Questions = ({text, user_name, data,userID}) => {
  return (
    <div className="card card-stars">
      <div className="card-body">
        <div className="row">
          <div className="col-12">
            <div className="text-left">
              <p>{text}</p>
              <Link to ={`/worker/${userID}`}><p>{user_name}</p></Link>  
              <p>{data}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions; 
