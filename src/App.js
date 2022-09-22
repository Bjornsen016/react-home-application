import { createContext, useState, useMemo } from "react";
import {
	CssBaseline,
	ThemeProvider,
	createTheme,
	Container,
	responsiveFontSizes,
} from "@mui/material";
import "./App.css";
import { TopBar, MainInfoScreen, Weather } from "./components";
import { Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { googleApiInfo } from "./config/googleApiInfo";
import { ColorModeContextProvider } from "./components/contexts/ColorModeContext";

const mainContainerStyle = {
	display: "grid",
	gridTemplateColumns: { xs: "repeat(1, 100%)", sm: "repeat(2, 49.5%)" }, //TODO: Change layout for landscape
	gridTemplateRows: { xs: "auto", sm: "66% 33%" },
	gridTemplateAreas: {
		sm: `"big-component big-component"
  "small-component-left small-component-right"
  `,
		xs: `"big-component"
  "small-component-left" 
  "small-component-right"
  `,
	},
	gridColumnGap: "1%",
	gridRowGap: "1%",
	height: { sm: "89vh", xs: "100%" },
	marginTop: "10px",
	marginBottom: "10px",
};

//TODO: Look into changing some of the useStates to useContexts

function App() {
	//user states
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
	const [googleApiToken, setGoogleApiToken] = useState(
		JSON.parse(localStorage.getItem("googleApiToken"))
	);
	const [chosenCalendars, setChosenCalendars] = useState(
		JSON.parse(localStorage.getItem("chosenCalendars"))
	);

	return (
		<GoogleOAuthProvider clientId={googleApiInfo.clientId}>
			<ColorModeContextProvider>
				<TopBar
					user={user}
					setGoogleApiToken={setGoogleApiToken}
					setUser={setUser}
					setChosenCalendars={setChosenCalendars}
				/>

				<Container sx={mainContainerStyle} maxWidth='lg'>
					<Routes>
						<Route
							path='/'
							element={
								<MainInfoScreen
									user={user}
									googleApiToken={googleApiToken}
									chosenCalendars={chosenCalendars}
									setChosenCalendars={setChosenCalendars}
								/>
							}
						/>
						<Route path='/weather' element={<Weather />} />
						<Route path='*' element={<div>This route does not exist</div>} />
					</Routes>
				</Container>
			</ColorModeContextProvider>
		</GoogleOAuthProvider>
	);
}

export default App;
