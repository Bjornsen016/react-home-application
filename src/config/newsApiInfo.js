const newsApiInfo = {
  key: "cbb12cd3016c48efa841576d616806e7",
  url: "https://newsapi.org/v2/",
  countryCode: "sv",
};

const fetchTopNews = async () => {
  const url = new URL(newsApiInfo.url);
  url.pathname = "/top-headlines";
  url.searchParams.set("country", newsApiInfo.countryCode);

  const headers = new Headers({
    "X-Api-Key": newsApiInfo.key,
  });
  await fetch(url, {
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(url);
      return data;
    });
};
