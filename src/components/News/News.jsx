import { genereteNewsUrl } from "../../config/newsApiInfo";
import { React, useState, useEffect } from "react";
import { Card, CardContent, Button, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";

export default function News() {
  const [newsData, setNewsData] = useState([]);
  const [newsCard, setNewsCard] = useState([]);

  async function fetchData(url) {
    const data = await fetch(url)
      .then((res) => res.json())
      .catch((err) => console.log(`Error: ${err}`));

    return data;
  }

  function caruselCard(props) {
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
    );
  }
  useEffect(() => {
    const fetchNews = async () => {
      const url = genereteNewsUrl();
      const newsData = await fetchData(url);
      setNewsData(newsData);
      console.log(newsData);
      const newsCard = {
        secondaryHeader: `Todays news`,
        primaryHeader: `${newsData.articles[14].author}`,
        body: `${newsData.articles[14].title}`,
        showbutton: false,
      };
      setNewsCard(newsCard);
    };

    fetchNews();
  }, []);

  return (
    <Carousel
      className="carousel"
      sx={{ overflow: { xs: "visible" }, height: { sm: "85%" } }}
      interval={8000}
    >
      {newsCard?.map((item, i) =>
        item.body ? <caruselCard key={i} item={item} /> : ""
      )}
    </Carousel>
  );
}
