import HistoryOfTheDay from "./History";
import NameOfTheDay from "./Name";
import JokeOfTheDay from "./Joke";

import { React, useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function FactOfTheDay() {
  const day = new Date().getDay();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const [items, setItems] = useState([]);
  console.log(items);

  useEffect(() => {
    const fetchHistory = async () => {
      await fetch(`https://byabbe.se/on-this-day/${month}/${day}/events.json`)
        .then((response) => response.json())
        .then((data) => {
          const index = Math.floor(Math.random() * data.events.length);
          const historyItem = {
            secondaryHeader: `On this day`,
            primaryHeader: `Year ${data.events[index].year}`,
            body: `${data.events[index].description}`,
          };

          setItems((prevItems) => [...prevItems, historyItem]);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const fetchJoke = async () => {
      await fetch(`https://v2.jokeapi.dev/joke/Programming`)
        .then((response) => response.json())
        .then((data) => {
          const jokeData =
            data.type === "single"
              ? {
                  type: data.type,
                  setup: data.joke,
                  response: "",
                }
              : {
                  type: data.type,
                  setup: `${data.setup}\n\n`,
                  response: `${data.delivery}`,
                };
          const jokeItem = {
            secondaryHeader: "Joke of the day",
            primaryHeader: "",
            body: `${jokeData.setup} ${jokeData.response} `,
          };

          setItems((prevItems) => [...prevItems, jokeItem]);
        });
    };
    const fetchName = async () => {
      await fetch(
        `https://sholiday.faboul.se/dagar/v2.1/${year}/${month}/${day}`
      )
        .then((response) => response.json())
        .then((data) => {
          const nameData = data.dagar.map((arr) => arr.namnsdag.join(" och "));
          const nameItem = {
            secondaryHeader: "Name of the day",
            primaryHeader: "",
            body: `${nameData} `,
          };
          setItems((prevItems) => [...prevItems, nameItem]);
        });
    };
    setItems([]);
    fetchHistory();
    fetchJoke();
    fetchName();
  }, []);

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
      {items?.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}
