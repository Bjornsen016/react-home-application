import { createContext, useState, useMemo, useContext } from "react";
import {
	ThemeProvider,
	createTheme,
	responsiveFontSizes,
	CssBaseline,
} from "@mui/material";

const ColorContext = createContext({
	toggleColorMode: () => {},
	mode: "",
});

export const ColorModeContextProvider = ({ children }) => {
	//Creates theme
	const [mode, setMode] = useState("dark");
	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
			},
			mode: mode,
		}),
		[mode]
	);

	const theme = useMemo(() => {
		let t = createTheme({
			palette: {
				mode,
			},
		});
		return responsiveFontSizes(t);
	}, [mode]);

	return (
		<ColorContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ColorContext.Provider>
	);
};

export const ColorMode = () => {
	return useContext(ColorContext);
};
