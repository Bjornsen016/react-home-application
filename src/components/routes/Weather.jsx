import * as React from 'react';
import FetchData from '../FetchData';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


  const day1 = new Date(); 
  const day2 = new Date(day1);
  const day3 = new Date(day1);
  const day4 = new Date(day1);

  day2.setDate(day2.getDate()+1)
  day3.setDate(day3.getDate()+2)
  day4.setDate(day4.getDate()+3)

  
  const Weather = () => {

    const [lerumData, setLerumData] = useState([]);
    const [gothenburgData, setGothenburgData] = useState([]);
    const [stockholmData, setStockholmData] = useState([]);
    const [malmoData, setMalmoData] = useState([]);

    const locations = [{name:"Lerum", data: lerumData }, {name:"Göteborg", data: gothenburgData}, {name:"Stockholm", data: stockholmData}, {name:"Malmo", data: malmoData}]

    useEffect(() => {
        fetchWeatherData();
      
      },[]);

      async function fetchWeatherData(){
    const apiKey= "5622e7863c25a93700490cfec8116633"
    const url0 = `https://api.openweathermap.org/data/2.5/forecast?q=${locations[0].name}&appid=${apiKey}&units=metric`
    const url1 = `https://api.openweathermap.org/data/2.5/forecast?q=${locations[1].name}&appid=${apiKey}&units=metric`
    const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${locations[2].name}&appid=${apiKey}&units=metric`
    const url3 = `https://api.openweathermap.org/data/2.5/forecast?q=${locations[3].name}&appid=${apiKey}&units=metric`
    const fetchedData0 = await FetchData(url0)
    const fetchedData1 = await FetchData(url1)
    const fetchedData2 = await FetchData(url2)
    const fetchedData3 = await FetchData(url3)
    const extractedData0=[ fetchedData0[0].list[1], fetchedData0[0].list[9],fetchedData0[0].list[17],fetchedData0[0].list[25]];
    const extractedData1=[ fetchedData1[0].list[1], fetchedData1[0].list[9],fetchedData1[0].list[17],fetchedData1[0].list[25]];
    const extractedData2=[ fetchedData2[0].list[1], fetchedData2[0].list[9],fetchedData2[0].list[17],fetchedData2[0].list[25]];
    const extractedData3=[ fetchedData3[0].list[1], fetchedData3[0].list[9],fetchedData3[0].list[17],fetchedData3[0].list[25]];
    setLerumData(extractedData0);
    setGothenburgData(extractedData1);
    setStockholmData(extractedData2);
    setMalmoData(extractedData3);
      }



    return (
        <TableContainer>
            <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Location</TableCell>
                        <TableCell align="right">{day1.toLocaleDateString('en-US', {weekday: 'long'})}</TableCell>
                        <TableCell align="right">{day2.toLocaleDateString('en-US', {weekday: 'long'})}</TableCell>
                        <TableCell align="right">{day3.toLocaleDateString('en-US', {weekday: 'long'})}</TableCell>
                        <TableCell align="right">{day4.toLocaleDateString('en-US', {weekday: 'long'})}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {locations.map(({name, data}) => (
                    <TableRow>
                    <TableCell component="th" scope="row" >{name}</TableCell>
                        {data && console.log(data)}
                        {data &&
                        data.map(({main, weather, dt_txt}) => (
                          <TableCell >
                             <div className='weather-info' key={dt_txt} >
                             <img alt="weather icon" src={`http://openweathermap.org/img/w/${weather[0].icon}.png`}/> 

                              <p style={{marginRight:"10px"}}>{Math.round(main.temp)} &#8451;</p>
                            </div>
                          </TableCell>
                    ))}
                    </TableRow>
                  ))}
                    
                </TableBody>
            </Table>
        </TableContainer>
    )
  }
  export default Weather