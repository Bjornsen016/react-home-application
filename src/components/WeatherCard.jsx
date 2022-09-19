import React from "react";
import "../App.css";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AirIcon from "@mui/icons-material/Air";

const WeatherCard = ({ userPositionData, userPositionName }) => {
  console.log(userPositionData);

  const today = new Date();

  return (
    <div className="weather-card-container">
      <>
        <div className="weather-card-lc">
          <h1 style={{ marginTop: "0" }}>{userPositionName}</h1>
          <p>
            {today.toLocaleDateString("en-US", { month: "long" })}
            <span> </span>
            {today.getDate()}
          </p>
          <p>{today.toLocaleDateString("en-US", { weekday: "long" })}</p>
          <p>
            Feels like {Math.round(userPositionData[0].main.feels_like)} &#8451;
          </p>{" "}
        </div>
        <div className="weather-card-cc">
          <img
            src={`./images/${userPositionData[0].weather[0].icon}.png`}
            alt="weatherIcon"
          />{" "}
          <div style={{ display: "flex", alignItems: "center" }}>
            <DeviceThermostatIcon />
            <h2 style={{ margin: "5px 0" }}>
              {Math.round(userPositionData[0].main.temp)} &#8451;
            </h2>
          </div>
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
            <p style={{ marginLeft: "5px" }}>Sunrise: 7:00</p>
          </div>
          <div style={{ display: "flex", alignProperty: "center" }}>
            <ArrowDownwardIcon />
            {/* <WbTwilightIcon/>  */}
            <p style={{ marginLeft: "5px" }}>Sunset: 19.20</p>
          </div>
          <div style={{ display: "flex", alignProperty: "center" }}>
            <AirIcon />
            <p style={{ marginLeft: "5px" }}>
              wind: {userPositionData[0].wind.speed}km/h{" "}
              {/* list[1].wind.speed */}
            </p>
          </div>
        </div>
      </>
    </div>
  );
};
export default WeatherCard;
