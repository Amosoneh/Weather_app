import React, { useState } from "react";
import { useWeather } from "../services/WeatherContext";

const SearchBar = () => {
  const [city, setCity] = useState('');
  const { setSearch } =
    useWeather();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      setSearch(city);
      setCity("");
    };
  }

  const handleChange = (e) => {
    e.preventDefault()
    setCity(e.target.value)
  }

  return (
    <div>
      {/* <form> */}
        <div className='input-group mb-4 w-75 mx-auto'>
          <input
            type='text'
          onChange={handleChange}
          value={city}
            className='form-control'
            placeholder='Search for city...'
            aria-label='Search for city'
            aria-describedby='basic-addon2'
          />
          <button
            onClick={handleSearch}
            className='input-group-text'
            id='basic-addon2'
            type='submit'
          >
            <i className='fas fa-search'></i>
          </button>
        </div>
      {/* </form> */}
    </div>
  );
};

export default SearchBar;
