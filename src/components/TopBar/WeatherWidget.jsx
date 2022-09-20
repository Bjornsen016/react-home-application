import React from "react";
import { useEffect, useState } from "react";
import FetchData from "../utils/FetchData";
import UseCurrentLocation from "../utils/UseCurrentLocation";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

const WeatherWidget = () => {
  const [lat, setLat] = useState("59.32932349999999");
  const [long, setLong] = useState("18.068580800000063");
  const [data, setData] = useState([]);
  const [locationName, setLocationName] = useState("Falun");

  useEffect(() => {
    fetchDataWithLocation();
  }, [lat, long]);

  const fetchDataWithLocation = async () => {
    const result = await getLocation();
    if (result === false) {
      fetchWeatherData();
      return;
    }
    setCoordinates(result.coords.latitude, result.coords.longitude).then(
      fetchWeatherData
    );
  };

  const getLocation = async () => {
    const result = await UseCurrentLocation();

    if (result.message === undefined) {
      return result;
    }
    console.log(result);
    return false;
  };
  async function setCoordinates(latitude, longitude) {
    setLat(latitude); //Tänk på att setFunktioner är asynkrona varför vi måste lyfta ut dessa i en egen funktion för att garantera att de har blivit satta innan url:en skickas iväg med parametrarna
    setLong(longitude);
  }

  async function fetchWeatherData() {
    const apiKey = "5622e7863c25a93700490cfec8116633";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
    const fetchedData = await FetchData(url);
    setData(fetchedData);
  }

  return (
    <div className="weather-widget">
      {data?.map(({ weather, main, id, name }) => (
        <Link to={`/weather?location=${name}`} key={id}>
          <div className="widget-column">
            <div className="widget-row">
              <p style={{ margin: "0 10px" }}>
                {Math.round(main.temp)} &#8451;
              </p>

              <img alt="weather icon" src={`./images/${weather[0].icon}.png`} />
            </div>
            <Tooltip title={name}>
              <p style={{ marginTop: "0" }}>
                {`${weather[0].description}`.charAt(0).toUpperCase() +
                  `${weather[0].description}`.slice(1)}
              </p>
            </Tooltip>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default WeatherWidget;
