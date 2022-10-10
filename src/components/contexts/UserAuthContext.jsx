import { useState, useContext, createContext } from "react";

const UserAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
	const [chosenCalendars, setChosenCalendars] = useState(
		JSON.parse(localStorage.getItem("chosenCalendars"))
	);

	const value = {
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
