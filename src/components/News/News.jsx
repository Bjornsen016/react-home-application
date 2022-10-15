import { genereteNewsUrl } from "../../config/newsApiInfo";
import { React, useState, useEffect } from "react";
import { Card, CardContent, Typography, Link } from "@mui/material";
import Carousel from "react-material-ui-carousel";

export default function News() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const url = genereteNewsUrl();
      const newsData = await fetchData(url);
      console.log(newsData);
      newsData.articles.forEach((article) => {
        const newsCard = {
          secondaryHeader: `News of the day`,
          primaryHeader: `${article.source.name}`,
          body: `${article.title}`,
          link: () => (
            <Link
              target="_blank"
              href={article.url}
              sx={{
                color: "text.primary",
              }}
            >
              Read more
            </Link>
          ),
        };
        setArticles((prevAppCard) => [...prevAppCard, newsCard]);
      });
    };
    setArticles([]);
    fetchNews();
  }, []);

  async function fetchData(url) {
    const data = await fetch(url)
      .then((res) => res.json())
      .catch((err) => console.log(`Error: ${err}`));

    return data;
  }

  return (
    <Carousel
      className="carousel"
      sx={{ overflow: { xs: "visible" }, height: { sm: "85%" } }}
      interval={8000}
    >
      {articles.map((item, i) => (
        <AppCard key={i} item={item} />
      ))}
    </Carousel>
  );
}

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
          }}
        >
          {props.item.body}
        </Typography>
        <Typography>{props.item.link()}</Typography>
      </CardContent>
    </Card>
  );
}
