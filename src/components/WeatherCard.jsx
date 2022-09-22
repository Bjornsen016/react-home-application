import React from "react";
import "../App.css";
import { Box } from "@mui/material";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AirIcon from "@mui/icons-material/Air";
import { ColorModeContext } from "../App";
import { ColorMode } from "./contexts/ColorModeContext";
import { useContext } from "react";

const WeatherCard = ({ userPositionData, userPositionName, sun }) => {
	//npm package to be able to convert unix timestamp to UTC time
	const today = new Date();
	const timestamp = require("@rockyli/timestamp");

	//Gets colorMode from App.js
	const { mode } = ColorMode();

	return (
		<Box className='weather-card-container'>
			<div className='weather-card-lc'>
				<h1 style={{ marginTop: "0" }}>{userPositionName}</h1>
				<p>
					{today.toLocaleDateString("en-GB", { month: "long" })}
					<span> </span>
					{today.getDate()}
				</p>
				<p>{today.toLocaleDateString("en-GB", { weekday: "long" })}</p>
			</div>
			<div className='weather-card-cc'>
				{mode === "dark" ? (
					<img
						alt='weather icon'
						src={`./images/${userPositionData[0].weather[0].icon}.png`}
					/>
				) : (
					<img
						alt='weather icon'
						src={`./images/${userPositionData[0].weather[0].icon}_b.png`}
					/>
				)}
				<div style={{ display: "flex", alignItems: "center" }}>
					<DeviceThermostatIcon />
					<h2 style={{ margin: "5px 0" }}>
						{Math.round(userPositionData[0].main.temp)}&#176;C
					</h2>
				</div>
				<p>
					Feels like {Math.round(userPositionData[0].main.feels_like)}&#176;C
				</p>{" "}
				<p>
					{`${userPositionData[0].weather[0].description}`
						.charAt(0)
						.toUpperCase() +
						`${userPositionData[0].weather[0].description}`.slice(1)}
				</p>
			</div>
			<div className='weather-card-rc'>
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
						Wind: {Math.round(userPositionData[0].wind.speed)}km/h
						{/* list[1].wind.speed */}
					</p>
				</div>
			</div>
		</Box>
	);
};
export default WeatherCard;
