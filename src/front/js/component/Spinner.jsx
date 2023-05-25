import React from "react";
import "../../styles/spinner.css"
import LogoWeb from "/workspace/Jobs-Hood/src/front/img/logoweb.png"

const Spinner = () => {
  return (
    <img src={LogoWeb} alt="Cargando..." className="loading-image" />
  );
};

export default Spinner;
