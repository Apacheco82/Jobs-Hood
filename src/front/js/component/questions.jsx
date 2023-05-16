import React from "react";

const Questions = ({text, user_name, data}) => {

  return (
    <div className="col-8 mt-2 d-flex justify-content-center">
      <div className="card card-stars">
        <div className="card-body">
          <div className="row">
            <div className="col-12">
              <div className="text-left">
                <p>{text}</p>
                <p>{user_name}</p>
                <p>{data}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions; 
