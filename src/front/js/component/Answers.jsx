import React from "react";

const Answers = ({comment}) => {

  return (
    <div className="col-8 mt-2 d-flex justify-content-center">
      <div className="card card-stars">
        <div className="card-body text-end">
          <p>{comment.text}</p>
          <p>{comment.name}</p>
          <p>{comment.data_create}</p>
        </div>
      </div>
    </div>
  );
};

export default Answers; 
