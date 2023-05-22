import React, { useState, useEffect } from "react";
import Card from "../component/cards.jsx";
import Pagination from "../component/pagination.jsx";
import { GetAllCompanies } from "../services/company.js";
import Search from "../component/search.jsx";
import Spinner from "../component/Spinner.jsx";
import Filter from "../component/Filter.jsx";
import { provincias } from "../component/form-province.jsx";
import { calculateAverageRating } from "../component/AverageRating.jsx";
import { Navbar } from "../component/navbar.js";

export const AllCompanies = () => {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [spinner, setSpinner] = useState(false);
  const [filter, setFilter] = useState("");
  const [minAverageRating, setMinAverageRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSpinner(true);
        const info = await GetAllCompanies();
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

  const filteredUsers = user
    .filter((i) => {
      const nameMatch = i.name.toLowerCase().includes(search.toLowerCase());
      const addressMatch = i.company.address
        .toLowerCase()
        .includes(search.toLowerCase());
      const provinceMatch = i.company.province
        .toLowerCase()
        .includes(search.toLowerCase());
      const emailMatch = i.email.toLowerCase().includes(search.toLowerCase());

      return nameMatch || addressMatch || provinceMatch || emailMatch;
    })
    .filter((i) => {
      return filter
        ? i.company.province.toLowerCase() === filter.toLowerCase()
        : true;
    })
    .filter((i) => {
      const averageRating = calculateAverageRating(i.received_reviews);
      return averageRating >= minAverageRating;
    });


  const paginatedUsers = filteredUsers
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>
          <Navbar />
          <h1 className="text-center"> Nuestras empresas</h1>

          <Search setSearch={setSearch} />
          <div className="container">
            <Filter
              filter={filter}
              setFilter={setFilter}
              minAverageRating={minAverageRating}
              setMinAverageRating={setMinAverageRating}
              provinces={provincias}
            />
            <div className="row">
              <div className="col-3"></div>
              <div className="col-8 mb-3">
                <div className="row">

                  {paginatedUsers.map((user, key) => {
                    const averageRating = calculateAverageRating(user.received_reviews)
                    return (
                      <Card
                        key={key}
                        name={user.name}
                        province={user.company.province}
                        email={user.email}
                        address={user.company.address}
                        category={"company"}
                        id={user.id}
                        averageRating={averageRating}

                      />
                    );
                  })}
                </div>
                <div className="row mt-3">
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
