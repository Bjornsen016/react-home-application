import { Checkbox, AppBar, Toolbar, Typography, Box } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import TopBarMenu from "./TopBarMenu";
import Clock from "./Clock";
import WeatherWidget from "./WeatherWidget";
import LoginWithGoogle from "./LoginWithGoogle";

//TODO: Make this into more smaller components
//TODO: Refactor to have a better understanding of what happens
export default function TopBar({
	colorMode,
	user,
	setGoogleApiToken,
	setUser,
	setChosenCalendars,
}) {
	return (
		<AppBar position='sticky' color='primary'>
			<Toolbar
				sx={{
					display: "grid",
					justifyContent: "space-around",
					gridTemplateColumns: "33% 33% 33%",
					justifyItems: "center",
				}}
			>
				<Box
					sx={{ display: "flex", alignItems: "center", justifySelf: "start" }}
				>
					<TopBarMenu
						user={user}
						setGoogleApiToken={setGoogleApiToken}
						setUser={setUser}
						setChosenCalendars={setChosenCalendars}
					/>
					<Checkbox
						onChange={colorMode.toggleColorMode}
						icon={<LightMode sx={{ color: "yellow" }} />}
						checkedIcon={<DarkMode sx={{ color: "white" }} />}
					/>
					<Typography variant='h6'>{user?.names.displayName}</Typography>
					{!user && (
						<LoginWithGoogle
							setGoogleApiToken={setGoogleApiToken}
							setUser={setUser}
						/>
					)}
				</Box>
				<Clock />
				{/* TODO: Make center on the top everytime, make instead of flex? */}
				<Box sx={{ justifySelf: "end" }}>
					<Typography variant='p'>
						<WeatherWidget />
					</Typography>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
