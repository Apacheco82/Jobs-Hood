import React, {useEffect, useState} from "react";
import {Tab, Nav} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {userById, getUserPrivate} from "../services";

export const CompanyProfile = () => {
  const params = useParams();
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({});
  const [company, setCompany] = useState({});
  const [activeKey, setActiveKey] = useState("#nav-home");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyId = params.id;
        
        if (!companyId) {
          //TOKEN
          const token = localStorage.getItem("token");
          const companyData = getUserPrivate(token);
          setUser(companyData);
          setCompany(companyData.company);
          console.log("la info", companyData);
          setLogin(true);
        } else {
          //ID
          const info = await userById(companyId);
          setUser(info.data);
          setCompany(info.data.company);
          console.log("la info", info.data);
          setLogin(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //console.log("datos de company", company.address)
  //console.log("todo el usuario", user)

  return (
    <>
      {login ? <div>Estás logado</div> : <div>Ruta pública</div>}
    </>
  );
}