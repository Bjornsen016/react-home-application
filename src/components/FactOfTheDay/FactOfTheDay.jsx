import { React, useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function FactOfTheDay() {
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const [items, setItems] = useState([]);
  console.log(day, month, year);

  useEffect(() => {
    const fetchHistory = async () => {
      await fetch(`https://byabbe.se/on-this-day/${month}/${day}/events.json`)
        .then((response) => response.json())
        .then((data) => {
          const index = Math.floor(Math.random() * data.events.length);
          const historyItem = {
            secondaryHeader: `History of this day`,
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
            secondaryHeader: "Name of this day",
            primaryHeader: `${nameData} `,
            body: "",
            style: "Name of this day",
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
      <Card>
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
    <Carousel
      interval={8000}
      //TODO keep 200px or change to REM?
      height={200}
      indicatorIconButtonProps={{
        style: {
          color: "blue",
          //TODO change colors or use deafult?
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          backgroundColor: "red",
          //TODO change colors or use deafult?
        },
      }}
    >
      {items?.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}
