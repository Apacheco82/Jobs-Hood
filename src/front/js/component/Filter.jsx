import React from "react";
import ReactStars from "react-rating-stars-component";

const Filter = ({filter, setFilter, provinces, minAverageRating, setMinAverageRating}) => {
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setMinAverageRating(newRating);
  };
  
  const handleReset = () => {
    setMinAverageRating(0);
    setFilter("")
  };

  return (

      <div className="card card-filter p-3 mt-1" style={{width: "18rem"}}>
        <div className="filter-component">
          <label htmlFor="filter">Filtrar por provincia: </label>
          <select id="filter" value={filter} onChange={handleFilterChange}>
            <option value="">Todas las provincias</option>
            {provinces.map((province, index) => (
              <option key={index} value={province}>
                {province}
              </option>
            ))}
          </select>

          <label htmlFor="rating">Calificación mínima: </label>
          <ReactStars
            count={5}
            size={24}
            activeColor="#ffd700"
            color="#ddd"
            edit={true}
            isHalf={true}
            value={minAverageRating}
            onChange={handleRatingChange}
          />
          <button type="button" onClick={handleReset} className="btn btn-success">Reset</button>
        </div>
      </div>

  );
};

export default Filter;
