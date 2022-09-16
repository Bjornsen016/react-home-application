async function FetchData(url) {
  const data = await fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log(`Error: ${err}`));

  return [data];
}
export default FetchData;
