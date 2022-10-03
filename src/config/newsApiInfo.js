const newsApiInfo = {
  key: "cbb12cd3016c48efa841576d616806e7",
  url: "https://newsapi.org",
  countryCode: "se",
};

export const genereteNewsUrl = () => {
  const url = new URL(newsApiInfo.url);
  url.pathname = "/v2/top-headlines";
  url.searchParams.set("country", newsApiInfo.countryCode);
  url.searchParams.set("apiKey", newsApiInfo.key);

  return url;
};
