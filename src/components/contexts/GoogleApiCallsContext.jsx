import { useState, useContext, createContext } from "react";
import { googleApiInfo } from "../../config/googleApiInfo";

const { googleRenewAuthToken } = googleApiInfo;

const GoogleApiCallsContext = createContext();

//TODO: Use this as such:
// useEffect(() => {
//  ... fetchDataFromApi(url); //But with one of the functions that has been defined
// with the fetchDataFromApi(url). Eg getEvents
//}, [apiToken])
// So that if the apiToken is updated we update the call to the api.
//
export const GoogleApiCallsContextProvider = ({ children }) => {
	const [apiToken, setApiToken] = useState(
		localStorage.getItem("googleApiToken")
	);

	async function fetchDataFromApi(url) {
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

	async function postDataToApi(url, body) {
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

	async function patchDataToApi(url, body) {
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

	async function deleteDataFromApi(url) {
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

	const value = {
		apiToken: {
			get: apiToken,
			set: (token) => setApiToken(token),
		},
		fetchDataFromApi: (url) => fetchDataFromApi(url),
		postDataToApi: (url, body) => postDataToApi(url, body),
		patchDataToApi: (url, body) => patchDataToApi(url, body),
		deleteDataFromApi: (url) => deleteDataFromApi(url),
	};

	return (
		<GoogleApiCallsContext.Provider value={value}>
			{children}
		</GoogleApiCallsContext.Provider>
	);
};

const checkTokenExpiration = async () => {
	let token = localStorage.getItem("googleApiToken");
	const expiration = new Date(localStorage.getItem("expirationDate"));
	if (!(expiration < new Date())) return token;

	const refresh_token = localStorage.getItem("refreshToken");
	//or //TODO: Below
	//const userRef = ref(db, "user/" + userId)
	//const refreshToken = userRef.get().refresh_token; //or something like it

	const newToken = await googleRenewAuthToken(refresh_token);
	localStorage.setItem("googleApiToken", newToken);

	const expirationDate = new Date(new Date().getTime() + 3600000);
	localStorage.setItem("expirationDate", expirationDate);
	return newToken;
};

export const UserAuth = () => {
	return useContext(GoogleApiCallsContext);
};
