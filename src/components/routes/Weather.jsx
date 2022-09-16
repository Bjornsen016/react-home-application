import * as React from 'react';
import FetchData from '../FetchData';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TextField } from '@mui/material';


  //sets the dates of today and the upcoming three days
  const day1 = new Date(); 
  const day2 = new Date(day1);
  const day3 = new Date(day1);
  const day4 = new Date(day1);
  day2.setDate(day2.getDate()+1)
  day3.setDate(day3.getDate()+2)
  day4.setDate(day4.getDate()+3)


  
  const Weather = () => {

    const [kirunaData, setKirunaData] = useState([]);
    const [gothenburgData, setGothenburgData] = useState([]);
    const [stockholmData, setStockholmData] = useState([]);
    const [malmoData, setMalmoData] = useState([]);
    const [userLocationData, setUserLocationData] = useState([]);
    const [userLocation, setUserLocation]= useState("")
    const [showUserLocation, setShowUserLocation] = useState(false)

    //Array of pre-chosen locations to fetch data for 
    const locations = [{name:"Kiruna", data: kirunaData }, {name:"Göteborg", data: gothenburgData}, {name:"Stockholm", data: stockholmData}, {name:"Malmö", data: malmoData}]

    const apiKey= "fe565ab92507d6d1bb097c37cea898b0"
    const url0 = `https://api.openweathermap.org/data/2.5/forecast?q=${locations[0].name}&appid=${apiKey}&units=metric`
    const url1 = `https://api.openweathermap.org/data/2.5/forecast?q=${locations[1].name}&appid=${apiKey}&units=metric`
    const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${locations[2].name}&appid=${apiKey}&units=metric`
    const url3 = `https://api.openweathermap.org/data/2.5/forecast?q=${locations[3].name}&appid=${apiKey}&units=metric`
    const urlUser = `https://api.openweathermap.org/data/2.5/forecast?q=${userLocation}&appid=${apiKey}&units=metric`
    useEffect(() => {
        fetchWeatherData();
      
      },[]); //when to update?

      async function onSubmit(event) {
          event.preventDefault();
          setUserLocation(event.target.value)

          const fetchedUserData = await FetchData(urlUser)
          const extractedUserData=[ fetchedUserData[0].list[1], fetchedUserData[0].list[9], fetchedUserData[0].list[17], fetchedUserData[0].list[25]];
          console.log(extractedUserData)
          setUserLocationData(extractedUserData).then(
          locations.push({name: userLocation, data: userLocationData}))
          setShowUserLocation(true)
          
        }
      

    //TODO: Refactor this part to some kind of loop!
    //Fetching the data for the pre-chosen locations, extract the neccessary data into new array and then set it in useState
    async function fetchWeatherData(){
    const fetchedData0 = await FetchData(url0)
    const fetchedData1 = await FetchData(url1)
    const fetchedData2 = await FetchData(url2)
    const fetchedData3 = await FetchData(url3)
    const extractedData0=[ fetchedData0[0].list[1], fetchedData0[0].list[9],fetchedData0[0].list[17],fetchedData0[0].list[25]];
    const extractedData1=[ fetchedData1[0].list[1], fetchedData1[0].list[9],fetchedData1[0].list[17],fetchedData1[0].list[25]];
    const extractedData2=[ fetchedData2[0].list[1], fetchedData2[0].list[9],fetchedData2[0].list[17],fetchedData2[0].list[25]];
    const extractedData3=[ fetchedData3[0].list[1], fetchedData3[0].list[9],fetchedData3[0].list[17],fetchedData3[0].list[25]];
    setKirunaData(extractedData0);
    setGothenburgData(extractedData1);
    setStockholmData(extractedData2);
    setMalmoData(extractedData3);
      }

    return (
      <div>
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
      {/* UserData, only shown if showUserLocation=true */}
                 {showUserLocation &&
                  userLocationData && 
                    userLocationData.map(({main, weather, dt_txt}) => (
                      <TableRow>
                      <TableCell key={dt_txt}>
                         <div className='weather-info'  >
                         <img alt="weather icon" src={`http://openweathermap.org/img/w/${weather[0].icon}.png`}/> 

                          <p style={{marginRight:"10px"}}>{Math.round(main.temp)} &#8451;</p>
                        </div>
                      </TableCell>
                      </TableRow>
                ))}                
      {/* Pre-chosen forecast */}
                  {locations.map(({name, data}) => (
                    <TableRow key={name}>
                    <TableCell component="th" scope="row" >{name}</TableCell>
                      {data &&
                        data.map(({main, weather, dt_txt}) => (
                          <TableCell key={dt_txt}>
                             <div className='weather-info'  >
                              <div className='weather-img-container'>
                                <img alt="weather icon" src={`./images/${weather[0].icon}.png`}/> 
                              </div>
                              <p style={{marginRight:"10px"}}>{Math.round(main.temp)} &#8451;</p>
                            </div>
                          </TableCell>
                    ))}
                    </TableRow>
                  ))}
                    
                </TableBody>
            </Table>
        </TableContainer>

        <form onSubmit={onSubmit}>
          <TextField 
            id="outlined-basic" 
            label="Search city..." 
            variant="outlined"
            margin="normal"
            size="small"
            onChange={(e) => setUserLocation(e.target.value)}
            >
          </TextField>
        </form>
        </div>
    )
  }
  export default Weather