const fetchHistoryData = async () => {
  const day = new Date().getDay() + 1;
  const month = new Date().getMonth() + 1;
  let returnData = [];
  let randomIndex = 0;
  await fetch(`https://byabbe.se/on-this-day/${month}/${day}/events.json`)
    .then((response) => response.json())
    .then((data) => {
      returnData = data;
      randomIndex = Math.floor(Math.random() * data.events.length);

      console.log(returnData.events[randomIndex]);
      return [returnData.events[randomIndex]];
    })
    .catch((error) => {
      console.log(error);
    });
};

export default fetchHistoryData;
