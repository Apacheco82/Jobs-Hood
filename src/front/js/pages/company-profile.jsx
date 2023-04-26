import React, {useEffect, useState} from "react";
import {Tab, Nav} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {userById, getUserPrivate} from "../services";

export const CompanyProfile = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [company, setCompany] = useState({});
  const [activeKey, setActiveKey] = useState("#nav-home");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyId = params.id;
        if (!companyId) {
          let token = localStorage.getItem("token");
          let companyData = getUserPrivate(token);
          setUser(companyData);
          setCompany(companyData.company);
          console.log("la info", companyData);

          islogin = true //de mentira

        } else {
          const info = await userById(companyId);
          setUser(info.data);
          setCompany(info.data.company);
          console.log("la info", info.data);

          islogin = false //de mentira
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
      <h1>{user.name}</h1>
      <h1></h1>

      <Nav
        variant="tabs"
        activeKey={activeKey}
        onSelect={(k) => setActiveKey(k)}
      >
        <Nav.Item>
          <Nav.Link eventKey="#nav-home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="#nav-profile">Profile</Nav.Link>
        </Nav.Item>
      </Nav>

      <Tab.Content>
        <Tab.Pane eventKey="#nav-home" active={activeKey === "#nav-home"}>
          <div>{user.name}</div>
        </Tab.Pane>

        <Tab.Pane eventKey="#nav-profile" active={activeKey === "#nav-profile"}>
          <div>{company.address}</div>
        </Tab.Pane>
      </Tab.Content>
    </>
  );
};
