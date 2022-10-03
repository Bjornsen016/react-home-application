import { genereteNewsUrl } from "../../config/newsApiInfo";
import FetchData from "../utils/FetchData";
import { React, useState, useEffect } from "react";
import { Card, CardContent, Button, Typography } from "@mui/material";

export default function News() {
  const [newsData, setNewsData] = useState([]);
  const [newsCard, setNewsCard] = useState([]);

  async function fetchData(url) {
    const data = await fetch(url)
      .then((res) => res.json())
      .catch((err) => console.log(`Error: ${err}`));

    return data;
  }
  useEffect(() => {
    const fetchNews = async () => {
      const url = genereteNewsUrl();
      const newsData = await fetchData(url);
      setNewsData(newsData);
      console.log(newsData);
      const newsCard = {
        secondaryHeader: `News of todays`,
        primaryHeader: `${newsData.articles[8].source.name}`,
        body: `${newsData.articles[8].description}`,
        showbutton: false,
      };
      setNewsCard(newsCard);
    };

    fetchNews();
  }, []);

  return (
    <div>
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
            {newsCard.secondaryHeader}
          </Typography>
          <Typography
            sx={{
              marginBottom: "0.35em",
            }}
            variant="h6"
            component="div"
          >
            {newsCard.primaryHeader}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              height: "100px",
              overflow: "auto",
              whiteSpace: "pre-line",
            }}
          >
            {newsCard.body}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
