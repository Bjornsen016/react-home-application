import FetchData from "../utils/FetchData";
import { React, useState, useEffect } from "react";

import Carousel from "react-material-ui-carousel";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import { Card, CardContent, Button, Typography, Link } from "@mui/material";

export default function FactOfTheDay() {
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const [historyData, setHistoryData] = useState([]);
  const [historyCard, setHistoryCard] = useState([]);
  const [nameCard, setNameCard] = useState([]);
  const [jokeCard, setJokeCard] = useState([]);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const historyData = await FetchData(
        `https://byabbe.se/on-this-day/${month}/${day}/events.json`
      );
      setHistoryData(historyData);
      const index = Math.floor(Math.random() * historyData[0].events.length);
      const historyCard = {
        secondaryHeader: `History of this day`,
        primaryHeader: `Year ${historyData[0].events[index].year}`,
        body: () => `${historyData[0].events[index].description}`,
        showbutton: true,
      };
      setHistoryCard(historyCard);
      setCards((prevAppCard) => [...prevAppCard, historyCard]);
    };
    const fetchJoke = async () => {
      const data = await FetchData(`https://v2.jokeapi.dev/joke/Programming`);
      const jokeData =
        data[0].type === "single"
          ? {
              type: data[0].type,
              setup: data[0].joke,
              response: "",
            }
          : {
              type: data[0].type,
              setup: `${data[0].setup}\n`,
              response: `${data[0].delivery}`,
            };
      const jokeCard = {
        secondaryHeader: "Joke of the day",
        primaryHeader: "Programming Joke",
        body: () => `${jokeData.setup} ${jokeData.response} `,
      };
      setJokeCard(jokeCard);
      setCards((prevAppCard) => [...prevAppCard, jokeCard]);
    };
    const fetchName = async () => {
      let nameData = await FetchData(
        `https://sholiday.faboul.se/dagar/v2.1/${year}/${month}/${day}`
      );
      nameData = nameData[0].dagar.map((arr) => arr.namnsdag.join(" och "));
      const nameCard = {
        secondaryHeader: "Name of this day",
        primaryHeader: `${nameData} `,
        body: () => (
          <Link
            target="_blank"
            href="https://svenskanamn.se/namnsdagar/"
            sx={{
              color: "text.primary",
            }}
          >
            Read more
          </Link>
        ),
      };
      setNameCard(nameCard);
      setCards((prevAppCard) => [...prevAppCard, nameCard]);
    };
    setCards([]);
    fetchHistory();
    fetchJoke();
    fetchName();
  }, []);

  const updateHistoryCard = () => {
    const index = Math.floor(Math.random() * historyData[0].events.length);
    const newHistoryCard = {
      secondaryHeader: `History of this day`,
      primaryHeader: `Year ${historyData[0].events[index].year}`,
      body: () => `${historyData[0].events[index].description}`,
      showbutton: true,
    };

    setHistoryCard(newHistoryCard);
    setCards([]);
    setCards((prevAppCard) => [...prevAppCard, historyCard]);
    setCards((prevAppCard) => [...prevAppCard, jokeCard]);
    setCards((prevAppCard) => [...prevAppCard, nameCard]);
  };

  function AppCard(props) {
    return (
      <Card>
        <CardContent
          sx={{
            backgroundColor: "inherit",
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              display: "flex",
              justifyContent: "space-between",
              textTransform: "uppercase",
              color: "primary.main",
            }}
            gutterBottom
          >
            {props.item.secondaryHeader}
            {props.item.showbutton ? (
              <Button
                //TODO buttonarea is not 100% clickable
                size="small"
                sx={{ marginRight: "20px" }}
                padding="none"
                onClick={() => {
                  updateHistoryCard();
                }}
              >
                <UpdateOutlinedIcon padding="none" />
              </Button>
            ) : (
              ""
            )}
          </Typography>
          <Typography
            sx={{
              marginBottom: "0.35em",
            }}
            variant="h6"
            component="div"
          >
            {props.item.primaryHeader}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              height: "100px",
              overflow: "auto",
              whiteSpace: "pre-line",
              paddingTop: props.item.padding,
            }}
          >
            {props.item.body()}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Carousel
      className="carousel"
      sx={{ overflow: { xs: "visible" }, height: { sm: "85%" } }}
      interval={8000}
    >
      {cards?.map((item, i) =>
        item.body ? <AppCard key={i} item={item} /> : ""
      )}
    </Carousel>
  );
}
