import React from 'react'

const Search = ({setSearch}) => {

    const handleChange = (e) =>{
        setSearch(e.target.value)
    }

  return (
    <form className="d-flex justify-content-center mb-3">
        <input type="text" placeholder='búsqueda de empresas' onChange={handleChange} />
        <button type="submit"className='btn btn-success'>Buscar</button>
    </form>
  )
}

export default Search