export async function fetchDataFromApi(url, token) {
	const headers = new Headers({
		"Content-Type": "application/json;charset=utf-8",
		Authorization: `Bearer ${token}`,
	});

	const baseUrl = new URL(url); //To be able to add the queries as params.

	const result = await fetch(baseUrl, {
		metod: "GET",
		headers: headers,
	}).then((res) => res.json());
	console.log(result);
	return result;
}
