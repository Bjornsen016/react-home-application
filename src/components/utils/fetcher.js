import { googleApiInfo } from "../../config/googleApiInfo";
import { UserAuth } from "../contexts/UserAuthContext";

const { googleRenewAuthToken } = googleApiInfo;

export async function fetchDataFromApi(url, token) {
	token = await checkTokenExpiration(token);
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

const checkTokenExpiration = async (token) => {
	const expiration = new Date(localStorage.getItem("expirationDate"));
	console.log("Expiration first: ", expiration);
	if (expiration < new Date()) {
		//send request to my backend.
		//get response with new token
		//save new token in localstorage
		//save new expirationDate in localstorage
		//return new token
		const refresh_token = localStorage.getItem("refreshToken");
		//or
		//const userRef = ref(db, "user/" + userId)
		//const refreshToken = userRef.get().refresh_token; //or something like it

		const newToken = await googleRenewAuthToken(refresh_token);
		console.log(newToken);

		const { googleApiToken } = UserAuth(); //TODO: Go to useing the localStorage instead of state with the tokens for Google

		googleApiToken.set(newToken);
		localStorage.setItem("googleApiToken", newToken);

		const expirationDate = new Date(new Date().getTime() + 3600000);
		localStorage.setItem("expirationDate", expirationDate);

		console.log("Expiration New: ", expiration);
		return newToken;
	} else if (expiration > new Date()) return token;

	//TODO: renew token if nessesary.
};
