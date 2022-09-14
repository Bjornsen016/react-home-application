import { React, useState, useEffect } from "react";
import AppCard from "./Card"

export default function HistoryOfYheDay() {
  const [day, setday] = useState(new Date().getDay() + 1);
  const [month, setmonth] = useState(new Date().getMonth() + 1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [randomData, setRandomData] = useState(0);

  useEffect(() => {
    const fetchOnThisDayEvent = async () => {
      await fetch(`https://byabbe.se/on-this-day/${month}/${day}/events.json`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setRandomData(Math.floor(Math.random() * data.events.length));
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
          console.log(error);
        });
    };
    fetchOnThisDayEvent();
  }, []);

  return (
    <div>
      {loading ? (
        <>
          <p>loading...</p>
        </>
      ) : (
        <>
          <AppCard
          secondaryHeader="On this day"
          primaryHeader={`Year ${data.events[randomData].year}`}
          bodyText={data.events[randomData].description}
          buttonText="Learn more"
          />
        </>
      )}
    </div>
  );
}
