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

	const value = {
		user: { user, setUser },
		googleApiToken: {
			get: googleApiToken,
			set: (token) => setGoogleApiToken(token),
		},
		chosenCalendars: { chosenCalendars, setChosenCalendars },
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
