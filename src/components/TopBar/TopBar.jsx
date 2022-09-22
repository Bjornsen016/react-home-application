import { Checkbox, AppBar, Toolbar, Typography, Box } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import TopBarMenu from "./TopBarMenu";
import Clock from "./Clock";
import WeatherWidget from "./WeatherWidget";
import LoginWithGoogle from "./LoginWithGoogle";
import { ColorMode } from "../contexts/ColorModeContext";

//TODO: Make this into more smaller components
//TODO: Refactor to have a better understanding of what happens
export default function TopBar({
	user,
	setGoogleApiToken,
	setUser,
	setChosenCalendars,
}) {
	const { toggleColorMode } = ColorMode();
	return (
		<AppBar position='static' color='primary'>
			<Toolbar
				sx={{
					display: "grid",
					justifyContent: "space-around",
					gridTemplateColumns: "33% 34% 33%",
					justifyItems: "center",
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifySelf: "start",
						flexWrap: "wrap",
					}}
				>
					<TopBarMenu
						user={user}
						setGoogleApiToken={setGoogleApiToken}
						setUser={setUser}
						setChosenCalendars={setChosenCalendars}
					/>
					<Checkbox
						onChange={toggleColorMode}
						icon={<LightMode sx={{ color: "yellow" }} />}
						checkedIcon={<DarkMode sx={{ color: "white" }} />}
					/>
					<Typography variant='h6' sx={{ fontSize: { xs: "80%", sm: "100%" } }}>
						{user?.names.displayName}
					</Typography>
					{!user && (
						<LoginWithGoogle
							setGoogleApiToken={setGoogleApiToken}
							setUser={setUser}
						/>
					)}
				</Box>
				<Clock />
				<Box sx={{ justifySelf: "end", fontSize: { xs: "80%", sm: "100%" } }}>
					<Typography variant='p'>
						<WeatherWidget />
					</Typography>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
