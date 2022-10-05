/*
 * Calls to this api ("https://www.daysoftheyear.com/api/v1/today/") results in cors-errors
 * and needs to go thure a proxy ("https://cors-anywhere.herokuapp.com/") in order to work and is
 * therefore not implemented now
 * //TODO Fix cors-error
 */
const daysOfTheYearApiInfo = {
  key: "898278c921a1d2a2107a1e746f7b5592",
  getTodaysEventUrl:
    "https://cors-anywhere.herokuapp.com/https://www.daysoftheyear.com/api/v1/today/",
};

const fetchEvent = async () => {
  const headers = new Headers({
    "X-Api-Key": daysOfTheYearApiInfo.key,
  });
  await fetch(daysOfTheYearApiInfo.getTodaysEventUrl, {
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
export const fetchTodaysEventCard = async () => {
  const data = await fetchEvent();
  const eventCard = {
    secondaryHeader: `Event of this day`,
    primaryHeader: `${data.data[0].name}`,
    body: () => `${data.data[0].excerpt}`,
  };
  return eventCard;
};
