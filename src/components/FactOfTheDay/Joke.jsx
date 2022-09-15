import { React, useState, useEffect } from "react";
import AppCard from "./Card";

export default function JokeOfYheDay() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  console.log(data);
  useEffect(() => {
    const fetchOnThisDayEvent = async () => {
      await fetch(`https://v2.jokeapi.dev/joke/Programming`)
        .then((response) => response.json())
        .then((data) => {
          setData(
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
                }
          );
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
            secondaryHeader={"Joke of the day"}
            primaryHeader=""
            bodyText={`${data.setup} ${data.response} `}
            buttonText="Learn more"
          />
        </>
      )}
    </div>
  );
}
