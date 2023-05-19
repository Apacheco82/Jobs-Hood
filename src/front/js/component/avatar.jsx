import React, { useState, useContext } from "react";
import { uploadAvatar } from "../services/user.js"
import {FaUpload} from "react-icons/fa";
import "../../styles/avatar.css";


export const Avatar = () => {
    
    const [file, setFile] = useState("");
    const [fileUrl, setFileUrl] = useState("");

    const handleChange = ({ target }) => {
        //console.log(target.files);
        if (target.files) {
          setFile(target.files[0]);
          const reader = new FileReader();
          reader.onload = (e) => {
            if (reader.readyState === 2) {
              //console.log("result", reader.result);
              setFileUrl(reader.result);
            }
          };
          reader.readAsDataURL(target.files[0]);
        }
      };
    
    const handleClick = () => {
        const form = new FormData(); //Objeto que contiene lo que le mandamos (avatar)
        //console.log(form);
        form.append("avatar", file);
        uploadAvatar(form);
      };
    
  
    return (
      <div className="input-group d-flex flex-column gap-2 align-items-start mb-3 avatar_container">
        
        <div className="row preview">
          <div className="col-12">
            <img src={fileUrl}></img>
          </div>
        </div>
        <div className="row">
          <div className="col">

            <label className="file" for="file">
              <span className="file_text">Elija una imagen</span>
              <span className="file_ico"><FaUpload/></span>
            </label>
            <input id="file" type="file" onChange={handleChange} ></input>
            
          </div>
          <div className="col">
            <button className="send_button" onClick={handleClick}>
              <span className="send">Enviar</span> 
            </button>

          </div>
        </div>
      </div>
    );
  };

export default Avatar;