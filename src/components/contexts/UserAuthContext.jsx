import { useState, useContext, createContext } from "react";

const UserAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
	const [googleApiToken, setGoogleApiToken] = useState(
		JSON.parse(localStorage.getItem("googleApiToken"))
	);
	const [chosenCalendars, setChosenCalendars] = useState(
		JSON.parse(localStorage.getItem("chosenCalendars"))
	);

	//TODO: Change user and chosenCalendars to act lite googleApiToken does.
	const value = {
		user: { get: user, set: (user) => setUser(user) },
		googleApiToken: {
			get: googleApiToken,
			set: (token) => setGoogleApiToken(token),
		},
		chosenCalendars: {
			get: chosenCalendars,
			set: (calendar) => setChosenCalendars(calendar),
		},
	};

	return (
		<UserAuthContext.Provider value={value}>
			{children}
		</UserAuthContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(UserAuthContext);
};
