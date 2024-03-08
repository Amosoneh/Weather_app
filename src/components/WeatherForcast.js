import React from "react";
import { useWeather } from "../services/WeatherContext";
// import axios from "axios";
const WeatherForcast = () => {
  const { forecast } = useWeather();

  console.log("5 Days Forecast weather ", forecast);

  const bimj = localStorage.getItem('image')

  console.log(bimj);

  let emoji;

  if (typeof forecast?.list != "undefined") {
    forecast.list.map((item) => {
      if (item.weather[0].main === "Clouds") {
         emoji = "fa-cloud";
      } else if (item.weather[0].main === "ThunderStorm") {
        emoji = "fa-cloud-bolt";
      } else if (item.weather[0].main === "Drizzle") {
        emoji = "fa-cloud-rain";
      } else if (item.weather[0].main === "Rain") {
        emoji = "fa-cloud-showers-heavy ";
      } else if (item.weather[0].main === "Snow") {
        emoji = "fa-snowflake";
      } else {
        emoji = "fa-smog";
      } return emoji;
    });
  } else {
    return <div>Loading...</div>;
  }

  // const cardStyle = {
  //   width: "160px",
  //   height: "220px",
  //   padding: "2px",
  //   fontSize: "15px",
  //   lineHeight: "0.5",
  // };
  const img = {
    textAlign: "center",
  };
  return (
    <div
      className='container'
      style={{
        backgroundImage: `url(${bimj})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h3 className='position-sticky fs-3 lead fw-bolder'>5-Day Weather Forecast in { forecast.city.name}</h3>
      <hr />
      <div className=' d-flex align-content-start flex-wrap'>
        {forecast ? (
          forecast.list?.map((item, index) => {
            const date = new Date(item.dt_txt);
            const weekday = date.toLocaleString("default", { weekday: "long" });
            const day = date.getDate();
            const month = date.toLocaleString("default", { month: "long" });
            const year = date.getFullYear();
            const time = date.toLocaleString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            });
            return (
              <div className=''>
                <div
                  className='card m-2 border bg-dark bg-opacity-50'
                  style={{
                    width: "160px",
                    height: "220px",
                    padding: "2px",
                    fontSize: "15px",
                    lineHeight: "0.5",
                    color: "white",
                  }}
                >
                  <div className='card-body' key={index}>
                    <p className='fs-6 fw-3'>{weekday}</p>
                    <p className='fw-3'>
                      {day}, {month}, {year}
                    </p>
                    <p className=' fw-3'>{time}</p>
                    <hr />
                    <p className=' lead fw-3 m-0 p-0 text-center'>
                      {item.weather[0].main}
                    </p>
                    <div className='text-center m-3'>
                      <i className={`fas ${emoji} fa-2x `} style={img}></i>
                    </div>
                    <p className='fs-6 fw-bold  text-center'>
                      {item.main.temp} &deg;C
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>Loading forecast...</p>
        )}
      </div>
    </div>
  );
};

export default WeatherForcast;
