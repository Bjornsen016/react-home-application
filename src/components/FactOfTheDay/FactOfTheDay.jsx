import HistoryOfTheDay from "./History";
import NameOfTheDay from "./Name";
import JokeOfTheDay from "./Joke";

import { React, useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function FactOfTheDay(props) {
  const [day, setday] = useState(new Date().getDay() + 1);
  const [month, setmonth] = useState(new Date().getMonth() + 1);
  const [historyData, setHistoryData] = useState([]);
  const [randomHistoryData, setHistoryRandomData] = useState(0);
  const [Historyloading, setHistoryLoading] = useState(true);
  const [Historyerror, setHistoryError] = useState(false);

  useEffect(() => {
    const fetchOnThisDayEvent = async () => {
      await fetch(`https://byabbe.se/on-this-day/${month}/${day}/events.json`)
        .then((response) => response.json())
        .then((data) => {
          setHistoryData(data);
          setHistoryRandomData(Math.floor(Math.random() * data.events.length));
          setHistoryLoading(false);
        })
        .catch((error) => {
          setHistoryLoading(false);
          setHistoryError(true);
          console.log(error);
        });
    };
    fetchOnThisDayEvent();
  }, []);

  const items = [
    {
      secondaryHeader: "History of this day",
      primaryHeader: `Year ${historyData.events[randomHistoryData].year}`,
      body: `${historyData.events[randomHistoryData].description}`,
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
