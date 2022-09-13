export async function fetchDataFromApi(url, token) {
  const headers = new Headers({
    "Content-Type": "application/json;charset=utf-8",
    Authorization: `Bearer ${token}`,
  });
  const result = await fetch(url, {
    metod: "GET",
    headers: headers,
  }).then((res) => res.json());
  console.log(result);
  return result;
}
