import FetchData from "../utils/FetchData";
import { daysOfTheYearApiInfo } from "../../config/daysOfTheYearApiInfo";
import { React, useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function FactOfTheDay() {
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1; //TODO varför +1?
  const year = new Date().getFullYear();

  const [cardInfo, setCardInfo] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const historyData = await FetchData(
        `https://byabbe.se/on-this-day/${month}/${day}/events.json`
      );
      const index = Math.floor(Math.random() * historyData[0].events.length);
      const historyCard = {
        secondaryHeader: `History of this day`,
        primaryHeader: `Year ${historyData[0].events[index].year}`,
        body: `${historyData[0].events[index].description}`,
      };
      setCardInfo((prevAppCard) => [...prevAppCard, historyCard]);
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
              setup: `${data[0].setup}\n\n`,
              response: `${data[0].delivery}`,
            };
      const jokeAppCard = {
        secondaryHeader: "Joke of the day",
        primaryHeader: "",
        body: `${jokeData.setup} ${jokeData.response} `,
      };

      setCardInfo((prevAppCard) => [...prevAppCard, jokeAppCard]);
    };
    const fetchName = async () => {
      let nameData = await FetchData(
        `https://sholiday.faboul.se/dagar/v2.1/${year}/${month}/${day}`
      );
      nameData = nameData[0].dagar.map((arr) => arr.namnsdag.join(" och "));
      const nameAppCard = {
        secondaryHeader: "Name of this day",
        primaryHeader: `${nameData} `,
        body: "",
      };
      setCardInfo((prevAppCard) => [...prevAppCard, nameAppCard]);
    };
    const fetchEvent = async () => {
      const headers = new Headers({
        "X-Api-Key": daysOfTheYearApiInfo.key,
      });
      await fetch(daysOfTheYearApiInfo.getTodaysEventUrl, {
        headers: headers,
      })
        .then((response) => response.json())
        .then((data) => {
          const eventCard = {
            secondaryHeader: `Event of this day`,
            primaryHeader: `${data.data[0].name}`,
            body: `${data.data[0].excerpt}`,
          };
          setCardInfo((prevAppCard) => [...prevAppCard, eventCard]);
        });
    };

    setCardInfo([]);
    fetchEvent();
    fetchHistory();
    fetchJoke();
    fetchName();
  }, []);

  function AppCard(props) {
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
      {cardInfo?.map((item, i) => (
        <AppCard key={i} item={item} />
      ))}
    </Carousel>
  );
}
