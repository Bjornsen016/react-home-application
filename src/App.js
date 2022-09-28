import { Container } from "@mui/material";
import "./App.css";
import { TopBar, MainInfoScreen, Weather } from "./components";
import { Route, Routes } from "react-router-dom";
import { ColorModeContextProvider } from "./components/contexts/ColorModeContext";
import { UserAuthContextProvider } from "./components/contexts/UserAuthContext";

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

function App() {
	return (
		<ColorModeContextProvider>
			<UserAuthContextProvider>
				<TopBar />

				<Container sx={mainContainerStyle} maxWidth='lg'>
					<Routes>
						<Route path='/' element={<MainInfoScreen />} />
						<Route path='/weather' element={<Weather />} />
						<Route path='*' element={<div>This route does not exist</div>} />
					</Routes>
				</Container>
			</UserAuthContextProvider>
		</ColorModeContextProvider>
	);
}

export default App;
