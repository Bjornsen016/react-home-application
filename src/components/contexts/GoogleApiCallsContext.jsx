import { useState, useContext, createContext } from "react";
import {
	fetchDataFromApi,
	postDataToApi,
	patchDataToApi,
	deleteDataFromApi,
} from "../utils/fetcher";

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
	const [chosenCalendars, setChosenCalendars] = useState(
		JSON.parse(localStorage.getItem("chosenCalendars"))
	);

	const value = {
		apiToken: {
			get: apiToken,
			set: (token) => setApiToken(token),
		},
		chosenCalendars: {
			get: chosenCalendars,
			set: (calendar) => setChosenCalendars(calendar),
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

export const UserAuth = () => {
	return useContext(GoogleApiCallsContext);
};
