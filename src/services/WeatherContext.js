import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export  const fetchCurrentWeatherData = async (search) => {
   const url = `weather?q=${search}&appid=${API_KEY}&units=metric`;
   try {
     const response = await axios.get(BASE_URL + url);
     // console.log(response.data);
     if (response.data != null || response.data.cod !== 404) {
      //  setCurrentWeather(response?.data);
       localStorage.setItem("currentWeather", JSON.stringify(response.data));
       return response.data;
     }
   } catch (error) {
     console.error(
       "Error fetching current weather:",
       error.response.data.message
     );
     alert(error.response.data.message);
   }
 };

export const fetchCurrentWeatherForecast = async (search) => {
     const url = `forecast/?q=${search}&appid=${API_KEY}&units=metric`;
    //  const url = `forecast/daily?lat=6.5833&lon=3.75&cnt=5&appid=${API_KEY}`;
     try {
       const response = await axios.get(BASE_URL + url);
       if (response.data != null || response.data.cod !== 404) {
         localStorage.setItem("forecast", JSON.stringify(response.data));
         return response.data;
       }
     } catch (error) {
       console.error(
         "Error fetching current weather:",
         error.response.data.message
       );
       alert(error.response.data.message);
     }
   };


const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState();
  const [forecast, setForecast] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [search, setSearch] = useState("lagos");

 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await fetchCurrentWeatherData(search);
        setCurrentWeather(weatherData);

        const forecastData = await fetchCurrentWeatherForecast(search);
        setForecast(forecastData);
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  },[search]);

  const value = {
    currentWeather,
    setCurrentWeather,
    forecast,
    setForecast,
    historicalData,
    setHistoricalData,
    search,
    setSearch,
    fetchCurrentWeatherData,
    fetchCurrentWeatherForecast,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export default WeatherProvider;
