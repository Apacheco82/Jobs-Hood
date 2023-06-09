import React from "react";

const Answers = ({comment}) => {
  return (

    <div className="card card-stars p-3 mt-1 text-end">
     
        <p className="card-text">{comment.text}</p>
        <div className="card-text">{comment.name}</div>
        <p className="card-text card-datetime">{comment.data_create}</p>
        </div>
   

  );
};


export default Answers; 
