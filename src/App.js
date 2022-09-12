import { createContext, useState, useMemo } from "react";
import {
	CssBaseline,
	ThemeProvider,
	createTheme,
	Container,
} from "@mui/material";
import "./App.css";
import { TopBar, MainInfoScreen } from "./components";
//import { GoogleOAuthProvider } from "@react-oauth/google"; Ta inte in än

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

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<TopBar colorMode={colorMode} />
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
					<MainInfoScreen />
				</Container>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
