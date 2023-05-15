import React, { useState, useEffect } from "react";
import Card from "../component/cards.jsx";
import Pagination from "../component/pagination.jsx";
import { GetAllLawyers } from "../services/lawyer.js";
import Search from "../component/search.jsx";
import Spinner from "../component/Spinner.jsx";

export const AllLawyers = () => {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [spinner, setSpinner] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setSpinner(true);
        const info = await GetAllLawyers();
        setUser(info.data);
        setSpinner(false);

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
    const addressMatch = i.lawyer.address.toLowerCase().includes(search.toLowerCase());
    const provinceMatch = i.lawyer.province.toLowerCase().includes(search.toLowerCase());
    const emailMatch = i.email.toLowerCase().includes(search.toLowerCase());
  
    return nameMatch || addressMatch || provinceMatch || emailMatch;
  });
  

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <>
    {spinner ? (<Spinner/>): (<>
      <h1 className="text-center"> Nuestros abogados</h1>
      <Search setSearch={setSearch}/>
      <div className="container">
        <div className="row">
          <div className="col-3">
          </div>
          <div className="col-8 mb-3">
          <div className="row">
          {paginatedUsers.map((user, key) => (
                <Card key={key} name={user.name} province={user.lawyer.province} email={user.email} address={user.lawyer.address} category={"lawyer"} id={user.id} />
              ))}
            </div>
            <div className="row mt-3">
              <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
            </div>
            </div>
          </div>
        </div>
    </>)}
    </>
  );
};
