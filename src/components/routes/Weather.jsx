import * as React from 'react';
import FetchData from '../FetchData';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }


  const day1 = new Date(); 
  const day2 = new Date(day1);
  const day3 = new Date(day1);
  const day4 = new Date(day1);

  day2.setDate(day2.getDate()+1)
  day3.setDate(day3.getDate()+2)
  day4.setDate(day4.getDate()+3)

  const locations = ["Lerum", "Göteborg", "Stockholm", "Malmo"]
  
  const Weather = () => {

  const [lerumData, setLerumData] = useState([]);
  const [gothenburgData, setGothenburgData] = useState([]);
  const [stockholmData, setStockholmData] = useState([]);
  const [malmoData, setMalmoData] = useState([]);

  useEffect(() => {
    fetchWeatherData();
    
},[]);

  async function fetchWeatherData(){

    const apiKey= "5622e7863c25a93700490cfec8116633"
/*                           api.openweathermap.org/data/2.5/forecast?q={city name},{country code}&appid={API key}
 */    const url0 = `https://api.openweathermap.org/data/2.5/forecast?q=${locations[0]}&appid=${apiKey}&units=metric`
    const url1 = `https://api.openweathermap.org/data/2.5/forecast?q=${locations[1]}&appid=${apiKey}&units=metric`
    const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${locations[2]}&appid=${apiKey}&units=metric`
    const url3 = `https://api.openweathermap.org/data/2.5/forecast?q=${locations[3]}&appid=${apiKey}&units=metric`
    const fetchedData0 = await FetchData(url0)
    const fetchedData1 = await FetchData(url1)
    const fetchedData2 = await FetchData(url2)
    const fetchedData3 = await FetchData(url3)
    setLerumData(fetchedData0);
    setGothenburgData(fetchedData1);
    setStockholmData(fetchedData2);
    setMalmoData(fetchedData3);

    
    
   }
        return(
        
<div>Hej
{lerumData && console.log(lerumData)}
{gothenburgData && console.log(gothenburgData)}
{stockholmData && console.log(stockholmData)}
{malmoData && console.log(malmoData)}

</div>
    )
}
export default Weather;

