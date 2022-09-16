import { Checkbox, AppBar, Toolbar, Typography, Box } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import TopBarMenu from "./TopBarMenu";
import Clock from "./Clock";
import {WeatherWidget} from "../components"

//TODO: Make this into more smaller components
//TODO: Refactor to have a better understanding of what happens
export default function TopBar({
	colorMode,
	user,
	setGoogleApiToken,
	setUser,
}) {
	return (
		<AppBar position='sticky' color='primary'>
			<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<TopBarMenu
						user={user}
						setGoogleApiToken={setGoogleApiToken}
						setUser={setUser}
					/>
					<Checkbox
						onChange={colorMode.toggleColorMode}
						icon={<LightMode sx={{ color: "yellow" }} />}
						checkedIcon={<DarkMode sx={{ color: "white" }} />}
					/>
					<Typography variant='h6'>{user?.names.displayName}</Typography>
				</Box>
				<Clock />
				{/* TODO: Make center on the top everytime, make instead of flex? */}
				<Box
					/* borderColor='textPrimary'
					sx={{
						border: "2px solid",
						padding: "10px",
					}} */
				>
					<Typography variant='p'>
						<WeatherWidget />
					</Typography>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
