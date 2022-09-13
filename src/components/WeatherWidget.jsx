import React from "react";
import { useEffect, useState } from "react";
import FetchData from "./FetchData";

const WeatherWidget = () => {
     
  const [lat, setLat] = useState("57.7689708");
  const [long, setLong] = useState("12.2526081");
  const [data, setData] = useState([]);
  

  useEffect(() => {
    fetchWeatherData();
    return() => console.log("Aborta api-callet, tex genom AbortController")

},[lat, long]);



 async function fetchWeatherData(){
  const apiKey= "5622e7863c25a93700490cfec8116633"
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  const fetchedData = await FetchData(url);
  setData(fetchedData);
 }

 /* const setCoordinates = (latitude, longitude) => {
  setLat (latitude); //Tänk på att setFunktioner är asynkrona varför vi måste lyfta ut dessa i en egen funktion för att garantera att de har blivit satta innan url:en skickas iväg med parametrarna
  setLong(longitude);
  
 } */
  return(
    
      <div className="weather-widget">
        {data && 
          data.map(({weather, main, id}) => (
            <div key={id} className="flex-column">
             <div className="flex-row">
              <p style={{marginRight:"5px"}}>{Math.round(main.temp)} &#8451;</p>
              <img alt="weather icon" src={`http://openweathermap.org/img/w/${weather[0].icon}.png`}/> 

              </div>
              <p style={{marginTop:"0"}}>{`${weather[0].description}`.charAt(0).toUpperCase() + `${weather[0].description}`.slice(1)}</p>
              
            </div>
          ))}  
      </div>

  )
}

export default WeatherWidget;