import React, { useState, useContext } from "react";
import { uploadAvatar } from "../services/user.js"
import {FaUpload} from "react-icons/fa";
import "../../styles/avatar.css";
import { Navigate } from "react-router-dom";


export const Avatar = ({handleChange, fileUrl, file}) => {
     
    return (
      <div className="input-group d-flex flex-column gap-2 align-items-start mb-3 avatar_container">
        
        <div className="row preview">
          <div className="col-12">
            <img src={fileUrl}></img>
          </div>
        </div>
        <div className="row">
          <div className="col">

            <label className="file" htmlFor="file">
              <span className="file_text">Elija una imagen</span>
              <span className="file_ico"><FaUpload/></span>
            </label>
            <input id="file" type="file"onChange={handleChange}></input>
          </div>
        </div>
      </div>
    );
  };

export default Avatar;