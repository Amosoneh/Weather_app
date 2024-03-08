import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar.js";

import { useWeather } from "../services/WeatherContext";
import WeatherForcast from "./WeatherForcast.js";

const WeatherDisplay = () => {
  const { currentWeather } = useWeather();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?client_id=DStDacT0WTpj8BLkuqn26RzV-OEC-_LSWJstKajDoxc&page=1&w=1600&h=900&query=${currentWeather?.weather[0].main}`
        );
        const data = await response.json();
        const firstImage = data.results[0];
        if (firstImage) {
          setImageUrl(firstImage.urls.raw);
          localStorage.setItem("image", firstImage.urls.raw);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [currentWeather]);

  // let temp = (currentWeather.main.temp -273.15).toFixed(2)

  console.log("Current data: ", currentWeather);

  let emoji;

  if (typeof currentWeather?.main != "undefined") {
    if (currentWeather?.weather[0].main === "Clouds") {
      emoji = "fa-cloud";
    } else if (currentWeather?.weather[0].main === "ThunderStorm") {
      emoji = "fa-cloud-bolt";
    } else if (currentWeather?.weather[0].main === "Drizzle") {
      emoji = "fa-cloud-rain";
    } else if (currentWeather?.weather[0].main === "Rain") {
      emoji = "fa-cloud-showers-heavy";
    } else if (currentWeather?.weather[0].main === "Snow") {
      emoji = "fa-snowflake";
    } else {
      emoji = "fa-smog";
    }
  } else {
    return <div>Loading...</div>;
  }

  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });

  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const style = {
    height: "540px",
    padding: "2px",
  };
  return (
    <div
      className='container-fluid  border border-danger d-flex'
      // style={{ height: "50%" }}
    >
      {/* <div className='container mt-1 d-inline border bg-danger'> */}
      <div className='card text-white text-center w-50'>
        {imageUrl && (
          <img
            src={imageUrl}
            className='card-img  '
            alt='img'
            style={{ height: "100%", width: "100%" }}
          />
        )}
        <div className='card-img-overlay justify-content-center mt-auto mb-auto'>
          <SearchBar />
          <div className=' bg-dark bg-opacity-50 py-3'>
            <h5 className='card-title fs-2'> {currentWeather?.name}, {currentWeather.sys.country} </h5>
            <p className='card-text'>
              {day}, {month} {date}, {year}
            </p>
            <br />
            {time}
            <div className='card-text'>
              <hr />
              <i className={`fas ${emoji} fa-4x`}></i>
              <h1 className='fw-bolder mb-5'>
                {" "}
                {currentWeather?.main.temp} &deg;C{" "}
              </h1>
              <p className='lead fw-bolder mb-0'>
                {currentWeather?.weather[0].main}
              </p>
              <p className='lead '>
                {currentWeather?.main.temp_min} &deg;C |{" "}
                {currentWeather?.main.temp_max} &deg;C
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className=' mt-1 d-inline w-50 overflow-auto'
        style={style}
      >
        <WeatherForcast />
      </div>
    </div>
  );
};

export default WeatherDisplay;
