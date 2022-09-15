import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const AppCard = ({primaryHeader, secondaryHeader, bodyText, buttonText}) => {
  return (
    <Card
    sx={{
      maxHeight: "100%",
    }}
  >
    <CardContent>
      {" "}
      <Typography
        sx={{ fontSize: 14 }}
        color="text.secondary"
        gutterBottom
      >
        {secondaryHeader}
      </Typography>
      <Typography variant="h6" component="div">
         {primaryHeader}
      </Typography>
      <Typography variant="body2"
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100px",
        overflow: "auto",
        whiteSpace:"pre-line"
      }}
      >
        {bodyText}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small"> {buttonText}</Button>
    </CardActions>
  </Card>
  );
}

export default AppCard