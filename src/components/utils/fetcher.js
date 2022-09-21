export async function fetchDataFromApi(url, token) {
  const headers = new Headers({
    "Content-Type": "application/json;charset=utf-8",
    Authorization: `Bearer ${token}`,
  });
  const result = await fetch(url, {
    method: "GET",
    headers: headers,
  }).then((res) => res.json());
  console.log(result);
  return result;
}

export async function postDataToApi(url, token, body) {
  const headers = new Headers({
    "Content-Type": "application/json;charset=utf-8",
    Authorization: `Bearer ${token}`,
  });

  const result = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers,
  }).then((res) => res.json());
  console.log(result);

  return result;
}

export async function patchDataToApi(url, token, body) {
  const headers = new Headers({
    "Content-Type": "application/json;charset=utf-8",
    Authorization: `Bearer ${token}`,
  });

  const result = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: headers,
  }).then((res) => res.json());
  console.log(result);

  return result;
}

export async function deleteDataFromApi(url, token) {
  const headers = new Headers({
    "Content-Type": "application/json;charset=utf-8",
    Authorization: `Bearer ${token}`,
  });
  const result = await fetch(url, {
    method: "DELETE",
    headers: headers,
  }).then((res) => res);
  console.log(result);
  return result;
}
