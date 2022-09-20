import React from "react";
import "../App.css";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AirIcon from "@mui/icons-material/Air";

const WeatherCard = ({
  userPositionData,
  userPositionName,
  sun,
  colorMode,
}) => {
  //npm package to be able to convert unix timestamp to UTC time
  const today = new Date();
  const timestamp = require("@rockyli/timestamp");

  return (
    <div className="weather-card-container" style={{}}>
      <div className="weather-card-lc">
        <h1 style={{ marginTop: "0" }}>{userPositionName}</h1>
        <p>
          {today.toLocaleDateString("en-GB", { month: "long" })}
          <span> </span>
          {today.getDate()}
        </p>
        <p>{today.toLocaleDateString("en-GB", { weekday: "long" })}</p>
      </div>
      <div className="weather-card-cc">
        {colorMode === "dark" ? (
          <img
            alt="weather icon"
            src={`./images/${userPositionData[0].weather[0].icon}.png`}
          />
        ) : (
          <img
            alt="weather icon"
            src={`./images/${userPositionData[0].weather[0].icon}_b.png`}
          />
        )}
        <div style={{ display: "flex", alignItems: "center" }}>
          <DeviceThermostatIcon />
          <h2 style={{ margin: "5px 0" }}>
            {Math.round(userPositionData[0].main.temp)} &#8451;
          </h2>
        </div>
        <p>
          Feels like {Math.round(userPositionData[0].main.feels_like)} &#8451;
        </p>{" "}
        <p>
          {`${userPositionData[0].weather[0].description}`
            .charAt(0)
            .toUpperCase() +
            `${userPositionData[0].weather[0].description}`.slice(1)}
        </p>
      </div>
      <div className="weather-card-rc">
        <div style={{ display: "flex", alignProperty: "center" }}>
          <ArrowUpwardIcon />
          {/* <WbTwilightIcon/> */}
          <p style={{ marginLeft: "5px" }}>
            Sunrise:<span> </span>
            {timestamp.toDatetimeString(sun.sunrise, {
              format: "HH:ss",
              timezone: "UTC+02",
            })}
          </p>
        </div>
        <div style={{ display: "flex", alignProperty: "center" }}>
          <ArrowDownwardIcon />
          {/* <WbTwilightIcon/>  */}
          <p style={{ marginLeft: "5px" }}>
            Sunset:<span> </span>
            {timestamp.toDatetimeString(sun.sunset, {
              format: "HH:ss",
              timezone: "UTC+02",
            })}
          </p>
        </div>
        <div style={{ display: "flex", alignProperty: "center" }}>
          <AirIcon />
          <p style={{ marginLeft: "5px" }}>
            wind: {Math.round(userPositionData[0].wind.speed)}km/h
            {/* list[1].wind.speed */}
          </p>
        </div>
      </div>
    </div>
  );
};
export default WeatherCard;
