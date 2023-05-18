import React from "react";

const Alert = ({className, message}) => {
  return (
    <div className={`alert alert-${className}`} role="alert">
      {message}
    </div>
  );
};

export default Alert;

