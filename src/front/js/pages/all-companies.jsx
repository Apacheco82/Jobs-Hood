import React, { useState, useEffect } from "react";
import Card from "../component/cards.jsx";
import Pagination from "../component/pagination.jsx";
import { GetAllCompanies } from "../services/company.js";
import Search from "../component/search.jsx";

export const AllCompanies = () => {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await GetAllCompanies();
        setUser(info.data);

      } catch (error) {
        console.log(error); //provisional, mas adelante se pintaran en pantalla los errores
      }
    };
    fetchData();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredUsers = user.filter((i) => {
    const nameMatch = i.name.toLowerCase().includes(search.toLowerCase());
    const addressMatch = i.company.address.toLowerCase().includes(search.toLowerCase());
    const cityMatch = i.company.city.toLowerCase().includes(search.toLowerCase());
    const emailMatch = i.email.toLowerCase().includes(search.toLowerCase());
  
    return nameMatch || addressMatch || cityMatch || emailMatch;
  });
  

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <>
      <h1 className="text-center"> Nuestras empresas</h1>

      <Search setSearch={setSearch}/>

      <div className="container">
        <div className="row">
          <div className="col-3">
 
          </div>
         
          <div className="col-8 mb-3">
          <div className="row">
          {paginatedUsers.map((user, key) => (
                <Card key={key} name={user.name} city={user.company.city} email={user.email} address={user.company.address} category={"company"} id={user.id} />
              ))}
            
            </div>
            <div className="row mt-3">
              <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
            </div>
            </div>
          </div>
        </div>

    </>
  );
};
