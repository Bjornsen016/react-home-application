import { React, useState, useEffect } from "react";
import AppCard from "./Card";

export default function NameOfTheDay() {
  const [day, setday] = useState(new Date().getDate());
  const [month, setmonth] = useState(new Date().getMonth()+1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  console.log(day, month, year)

  useEffect(() => {
    const fetchOnThisDayEvent = async () => {
      await fetch(`https://sholiday.faboul.se/dagar/v2.1/${year}/${month}/${day}`)
        .then((response) => response.json())
        .then((data) => {
          const names = data.dagar.map((arr) => arr.namnsdag.join(" och "));
          setData(names);
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
          secondaryHeader={"Name of the day"} 
          primaryHeader={data} 
          bodyText=""
          buttonText="Learn more"/>
        </>
      )}
    </div>
  );
}
