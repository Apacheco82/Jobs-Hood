import React from "react";

const Questions = (props) => {
  return (
<div className="col-8 mt-2">
  <div className="card">
    <div className="card-body">
      <div className="row">
        <div className="col-12">
          <div className="text-left">
            <p>{props.text}</p>
            <p>{props.user_name}</p>
            <p>{props.data}</p>
          </div>
        </div>
        {props.comment &&
          typeof props.comment === "object" && (
            <div className="col-12">
              <div className="card">
                <div className="card-body text-end">
                  <p>{props.comment.text}</p>
                  <p>{props.comment.name}</p>
                  <p>{props.comment.data_create}</p>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  </div>
</div>
  );
};

export default Questions;
