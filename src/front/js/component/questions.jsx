import React from "react";
import {Link} from "react-router-dom";

const Questions = ({text, user_name, data, userID, question, lawyer_id}) => {
  return (

      <div className="card card-stars p-3 mt-1 text-left">
        <p className="card-text">{text}</p>
        <Link to={`/worker/${userID}`}>
          <p className="card-text">{user_name}</p>
        </Link>
        {question && (
          <div className="card-text">
            <Link to={`/lawyer/${lawyer_id}`}>
              <p>Ver pregunta</p>
            </Link>
          </div>
        )}

        <p className="card-text card-datetime">{data}</p>
      </div>
 
  );
};

export default Questions;
