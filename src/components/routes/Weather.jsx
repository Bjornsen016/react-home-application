import * as React from "react";
import FetchData from "../utils/FetchData";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import WeatherCard from "../WeatherCard";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import { useContext } from "react";

//sets the dates of today and the upcoming three days
const day1 = new Date();
const day2 = new Date(day1);
const day3 = new Date(day1);
const day4 = new Date(day1);
day2.setDate(day2.getDate() + 1);
day3.setDate(day3.getDate() + 2);
day4.setDate(day4.getDate() + 3);

const Weather = ({ colorMode }) => {
  //Access user position name from query param in url
  const location = useLocation();
  const fetchUserPosition = new URLSearchParams(location.search).get(
    "location"
  );
  //Gets colormode from app

  //useState for the four initial city forecast
  const [data0, setData0] = useState(undefined);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  //useState for city names (usePosition is set to "Falun" from URL if there is no userPosition available)
  const [data1City, setData1City] = useState([]);
  const [data2City, setData2City] = useState([]);
  const [data3City, setData3City] = useState([]);
  //User specific information
  const [userPosition, setUserPosition] = useState(fetchUserPosition);
  const [userLocationSun, setUserLocationSun] = useState({});
  //useState for searched location, data and name.
  const [searchedLocationData, setSearchedLocationData] = useState([]);
  const [searchedLocation, setSearchedLocation] = useState("");
  const [searchedLocationCity, setSearchedLocationCity] = useState([]);
  //This bool decides wether searched location data should be shown or not
  const [showSearchedLocation, setShowSearchedLocation] = useState(false);

  //Array of pre-chosen locations to fetch data for
  const locations = [
    { name: "", data: data0, cityName: userPosition },
    { name: "Göteborg", data: data1, cityName: data1City },
    { name: "Stockholm", data: data2, cityName: data2City },
    { name: "Malmö", data: data3, cityName: data3City },
  ];

  //Urls for fetching data from open weather map API
  const apiKey = "fe565ab92507d6d1bb097c37cea898b0";
  const url0 = `https://api.openweathermap.org/data/2.5/forecast?q=${userPosition}&appid=${apiKey}&units=metric`;
  const url1 = `https://api.openweathermap.org/data/2.5/forecast?q=${locations[1].name}&appid=${apiKey}&units=metric`;
  const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${locations[2].name}&appid=${apiKey}&units=metric`;
  const url3 = `https://api.openweathermap.org/data/2.5/forecast?q=${locations[3].name}&appid=${apiKey}&units=metric`;
  const urlSearchedLocation = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedLocation}&appid=${apiKey}&units=metric`;

  useEffect(() => {
    fetchWeatherData();
  }, []);

  //Method when user has chosen a city to show forecast for
  async function onSubmit(event) {
    event.preventDefault();
    setSearchedLocation(event.target.value);

    //Fetch data for user chosen city
    const fetchedUserData = await FetchData(urlSearchedLocation);
    setSearchedLocationCity(fetchedUserData[0].city.name);
    const extractedUserData = [
      fetchedUserData[0].list[1],
      fetchedUserData[0].list[9],
      fetchedUserData[0].list[17],
      fetchedUserData[0].list[25],
    ];
    setSearchedLocationData(extractedUserData);

    setShowSearchedLocation(true);
  }

  //TODO: Refactor this part to some kind of loop!
  //Fetching the data for the pre-chosen locations, extract the neccessary data into new array and then set it in useState
  async function fetchWeatherData() {
    const fetchedData0 = await FetchData(url0);
    const fetchedData1 = await FetchData(url1);
    const fetchedData2 = await FetchData(url2);
    const fetchedData3 = await FetchData(url3);
    //Saves city names and sun information for user location
    setUserLocationSun({
      sunrise: `${fetchedData0[0].city.sunrise}`,
      sunset: `${fetchedData0[0].city.sunset}`,
    });
    setData1City(fetchedData1[0].city.name);
    setData2City(fetchedData2[0].city.name);
    setData3City(fetchedData3[0].city.name);
    const extractedData0 = [
      fetchedData0[0].list[1],
      fetchedData0[0].list[9],
      fetchedData0[0].list[17],
      fetchedData0[0].list[25],
    ];
    const extractedData1 = [
      fetchedData1[0].list[1],
      fetchedData1[0].list[9],
      fetchedData1[0].list[17],
      fetchedData1[0].list[25],
    ];
    const extractedData2 = [
      fetchedData2[0].list[1],
      fetchedData2[0].list[9],
      fetchedData2[0].list[17],
      fetchedData2[0].list[25],
    ];
    const extractedData3 = [
      fetchedData3[0].list[1],
      fetchedData3[0].list[9],
      fetchedData3[0].list[17],
      fetchedData3[0].list[25],
    ];
    //Saves the extracted data
    setData0(extractedData0);
    setData1(extractedData1);
    setData2(extractedData2);
    setData3(extractedData3);
  }

  return (
    <div className="weather-page-container">
      <MuiLink
        component={Link}
        to="/"
        sx={{
          display: "flex",
          alignItems: "center",
          color: "primary",
        }}
      >
        <ArrowBackIosNewIcon /> Back
      </MuiLink>

      {data0 !== undefined ? (
        <WeatherCard
          userPositionData={data0}
          userPositionName={userPosition}
          sun={userLocationSun}
        />
      ) : (
        <></>
      )}
      <TableContainer>
        <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">
                {day1.toLocaleDateString("en-US", { weekday: "long" })}
              </TableCell>
              <TableCell align="center">
                {day2.toLocaleDateString("en-US", { weekday: "long" })}
              </TableCell>
              <TableCell align="center">
                {day3.toLocaleDateString("en-US", { weekday: "long" })}
              </TableCell>
              <TableCell align="center">
                {day4.toLocaleDateString("en-US", { weekday: "long" })}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* UserSearchData, only shown if showSearchedLocation=true */}
            {showSearchedLocation && (
              <TableRow
              /* sx={{
                  bgcolor: "darkgray", //Set this to panel-color?
                }} */
              >
                <TableCell component="th" scope="row">
                  {searchedLocationCity}
                </TableCell>
                {searchedLocationData?.map(
                  ({ main, weather, dt_txt, city }) => (
                    <TableCell key={dt_txt}>
                      <div className="weather-info">
                        {colorMode === "dark" ? (
                          <img
                            alt="weather icon"
                            src={`./images/${weather[0].icon}.png`}
                          />
                        ) : (
                          <img
                            alt="weather icon"
                            src={`./images/${weather[0].icon}_b.png`}
                          />
                        )}

                        <p style={{ marginRight: "10px" }}>
                          {Math.round(main.temp)} &#8451;
                        </p>
                      </div>
                    </TableCell>
                  )
                )}
              </TableRow>
            )}
            {/* Pre-chosen forecast */}
            {locations.map(({ name, data, cityName }) => (
              <TableRow key={name}>
                <TableCell component="th" scope="row">
                  {cityName}
                </TableCell>
                {data &&
                  data.map(({ main, weather, dt_txt }) => (
                    <TableCell key={dt_txt}>
                      <div className="weather-info">
                        <div className="weather-img-container">
                          {colorMode === "dark" ? (
                            <img
                              alt="weather icon"
                              src={`./images/${weather[0].icon}.png`}
                            />
                          ) : (
                            <img
                              alt="weather icon"
                              src={`./images/${weather[0].icon}_b.png`}
                            />
                          )}
                        </div>
                        <p style={{ marginRight: "10px" }}>
                          {Math.round(main.temp)} &#8451;
                        </p>
                      </div>
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "15px",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search city..."
          margin="normal"
          size="small"
          onChange={(e) => setSearchedLocation(e.target.value)}
        ></TextField>
      </form>
    </div>
  );
};
export default Weather;
