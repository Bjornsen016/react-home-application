import { createContext, useState, useMemo } from "react";
import {
	CssBaseline,
	ThemeProvider,
	createTheme,
	Container,
} from "@mui/material";
import "./App.css";
import { TopBar, MainInfoScreen, Weather } from "./components";
import { Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { googleApiInfo } from "./config/googleApiInfo";

const ColorModeContext = createContext({ toggleColorMode: () => {} });
//TODO: Make responsive
const mainContainerStyle = {
	display: "grid",
	gridTemplateColumns: "repeat(2, 50%)",
	gridTemplateRows: "66% 33%",
	gridTemplateAreas: `"big-component big-component"
"small-component-left small-component-right"
`,
	gridColumnGap: "10px",
	gridRowGap: "10px",
	height: "90vh",
	marginTop: "10px",
};

//TODO: Make all text responsive sizing.

function App() {
	//Creates theme
	const [mode, setMode] = useState("dark");
	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
			},
		}),
		[]
	);

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
				},
			}),
		[mode]
	);

	//user states
	const [user, setUser] = useState(undefined);
	const [googleApiToken, setGoogleApiToken] = useState({});
	const [chosenCalendars, setChosenCalendars] = useState([]);

	return (
		<GoogleOAuthProvider clientId={googleApiInfo.clientId}>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<TopBar
						colorMode={colorMode}
						user={user}
						setGoogleApiToken={setGoogleApiToken}
						setUser={setUser}
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
				</ThemeProvider>
			</ColorModeContext.Provider>
		</GoogleOAuthProvider>
	);
}

export default App;
