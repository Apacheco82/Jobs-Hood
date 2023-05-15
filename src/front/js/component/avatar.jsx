import React, { useState, useContext } from "react";
import { uploadAvatar } from "../services/user.js"
import {FaUpload} from "react-icons/fa";


export const Avatar = () => {
    
    const [file, setFile] = useState("");
    const [fileUrl, setFileUrl] = useState("");

    const handleChange = ({ target }) => {
        console.log(target.files);
        if (target.files) {
          setFile(target.files[0]);
          const reader = new FileReader();
          reader.onload = (e) => {
            if (reader.readyState === 2) {
              console.log("result", reader.result);
              setFileUrl(reader.result);
            }
          };
          reader.readAsDataURL(target.files[0]);
        }
      };
    
    const handleClick = () => {
        const form = new FormData(); //Objeto que contiene lo que le mandamos (avatar)
        console.log(form);
        form.append("avatar", file);
        uploadAvatar(form);
      };
    
  
    return (
      <div className="container input-group mb-3">
        
        <img src={fileUrl}></img>
        <label className="file" for="file">
          <span className="file_text">Elija una imagen</span>
          <span className="file_ico"><FaUpload/></span>
        </label>
        <input id="file" type="file" onChange={handleChange} ></input>
        
        <button className="send_file" onClick={handleClick}>Enviar</button>
      </div>
    );
  };