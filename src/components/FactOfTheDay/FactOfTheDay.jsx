import HistoryOfTheDay from "./History";
import NameOfTheDay from "./Name";
import JokeOfTheDay from "./Joke";

import { React } from "react";
import Carousel from "react-material-ui-carousel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function FactOfTheDay(props) {
  const components = [<HistoryOfTheDay />, <NameOfTheDay />, <JokeOfTheDay />];
  const items = [
    {
      secondaryHeader: "secondaryHeader #1",
      primaryHeader: "primaryHeader#1",
      body: "Probably the most random thing you have ever seen! Probably the most random thing you have ever seen! Probably the most random thing you have ever seen!",
    },
    {
      secondaryHeader: "secondaryHeader #2",
      primaryHeader: "primaryHeader#2",
      body: "Hello World!",
    },
    {
      secondaryHeader: "secondaryHeader #3",
      primaryHeader: "primaryHeader#3",
      body: "lorem<h2>{props.item.name}</h2props.item.description}</p>",
    },
  ];
  function Item(props) {
    return (
      <Card
        sx={{
          maxHeight: "100%",
        }}
      >
        <CardContent>
          {" "}
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.item.secondaryHeader}
          </Typography>
          <Typography variant="h6" component="div">
            {props.item.primaryHeader}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100px",
              overflow: "auto",
              whiteSpace: "pre-line",
            }}
          >
            {props.item.body}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}
