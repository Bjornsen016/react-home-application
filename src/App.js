import { createContext, useState, useMemo } from "react";
import {
	CssBaseline,
	ThemeProvider,
	createTheme,
	Container,
} from "@mui/material";
import "./App.css";
import { TopBar, MainInfoScreen, TestRoute } from "./components";
import { Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { googleApiInfo } from "./config/googleApiInfo";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
	//Create theme
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
					<Container
						sx={{
							display: "grid",
							gridTemplateColumns: "repeat(2, 1fr)",
							gridTemplateRows: "2fr 1fr",
							gridColumnGap: "10px",
							gridRowGap: "10px",
							height: "90vh",
							marginTop: "10px",
						}}
						maxWidth='lg'
					>
						<Routes>
							<Route
								path='/'
								element={
									<MainInfoScreen user={user} googleApiToken={googleApiToken} />
								}
							/>
							<Route path='*' element={<div>This route does not exist</div>} />
						</Routes>
					</Container>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</GoogleOAuthProvider>
	);
}

export default App;
