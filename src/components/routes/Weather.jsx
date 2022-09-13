import * as React from 'react';
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
  
  const rows = [
    createData('Göteborg', 14, 6.0, 24, 4.0),
    createData('Stockholm', 237, 9.0, 37, 4.3),
    createData('Malmö', 262, 16.0, 24, 6.0),
    
  ];
  //upcomingWeekdays[0].toLocaleDateString('en-US', {weekday: 'long'})
  const day1 = new Date(); 
  const day2 = new Date(day1);
  const day3 = new Date(day1);
  const day4 = new Date(day1);

  day2.setDate(day2.getDate()+1)
  day3.setDate(day3.getDate()+2)
  day4.setDate(day4.getDate()+3)


  console.log(day1)
  console.log(day2)
/* const upcomingWeekdays = [ {todayDate} ]  */


const Weather = () => {
        return(
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}
export default Weather;

