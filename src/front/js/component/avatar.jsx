import React, { useState, useContext } from "react";
import { uploadAvatar } from "../services/user.js"


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
        const form = new FormData();
        form.append("avatar", file);
        uploadAvatar(form);
      };
    
  
    return (
      <div className="container">
        <p>Añada una imagen</p>
        <img src={fileUrl}></img>
        <input type="file" onChange={handleChange}></input>
        
        <button onClick={handleClick}>Enviar</button>
      </div>
    );
  };