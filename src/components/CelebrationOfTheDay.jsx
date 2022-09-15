import { React, useState, useEffect } from "react";
import AppCard from "./Card";

export default function NameOfTheDay() {

    const apiKey = "898278c921a1d2a2107a1e746f7b5592";
    /**
     * https://www.daysoftheyear.com/api-docs/
     * 898278c921a1d2a2107a1e746f7b5592
     */
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  console.log(data)

  useEffect(() => {
    const fetchOnThisDayEvent = async () => {
        
      await fetch(`https://www.daysoftheyear.com/api/v1/today/`,{
        headers:{
            'x-api-key': 'Bearer 12345678'
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
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
          secondaryHeader={"Celebration of the day"} 
          primaryHeader="" 
          bodyText=""
          buttonText="Learn more"/>
        </>
      )}
    </div>
  );
}
