const fetchHistoryData = async ({
  setHistoryData,
  setRandomHistoryData,
  setHistoryLoading,
  setHistoryError,
}) => {
  const day = new Date().getDay() + 1;
  const month = new Date().getMonth() + 1;
  await fetch(`https://byabbe.se/on-this-day/${month}/${day}/events.json`)
    .then((response) => response.json())
    .then((data) => {
      setHistoryData(data);
      setRandomHistoryData(Math.floor(Math.random() * data.events.length));
      setHistoryLoading(false);
    })
    .catch((error) => {
      setHistoryLoading(false);
      setHistoryError(true);
      console.log(error);
    });
};
