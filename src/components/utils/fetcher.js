import { googleApiInfo } from "../../config/googleApiInfo";

const { googleRenewAuthToken } = googleApiInfo;

export async function fetchDataFromApi(url) {
	const token = await checkTokenExpiration();
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

export async function postDataToApi(url, body) {
	const token = await checkTokenExpiration();
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

export async function patchDataToApi(url, body) {
	const token = await checkTokenExpiration();
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

export async function deleteDataFromApi(url) {
	const token = await checkTokenExpiration();
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

const checkTokenExpiration = async () => {
	let token = localStorage.getItem("googleApiToken");
	const expiration = new Date(localStorage.getItem("expirationDate"));
	if (!(expiration < new Date())) return token;

	const refresh_token = localStorage.getItem("refreshToken");
	//or //TODO: Below
	//const userRef = ref(db, "user/" + userId)
	//const refreshToken = userRef.get().refresh_token; //or something like it
	console.log("Renewing token");
	const newToken = await googleRenewAuthToken(refresh_token);
	localStorage.setItem("googleApiToken", newToken);

	const expirationDate = new Date(new Date().getTime() + 3600000);
	localStorage.setItem("expirationDate", expirationDate);
	console.log("Token has been renewed");
	return newToken;
};
