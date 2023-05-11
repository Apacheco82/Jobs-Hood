import React from "react";
import { Link } from "react-router-dom";

const LinkButton = ({direction, text, type}) => {
  return (
    <div>
        <Link to={`${direction}`}>
      <button type={type} className="btn btn-success">
        {text}
      </button>
      </Link>
    </div>
  );
};

export default LinkButton;
