import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { googleLogout } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { UserAuth } from "../contexts/UserAuthContext";

function TopBarMenu() {
	const { user, googleApiToken, chosenCalendars } = UserAuth();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleSignOut = () => {
		googleLogout();
		user.setUser();
		googleApiToken.set();
		chosenCalendars.setChosenCalendars();
		localStorage.removeItem("user");
		localStorage.removeItem("googleApiToken");
		localStorage.removeItem("chosenCalendars");
		handleClose();
	};

	return (
		<>
			<IconButton
				onClick={handleClick}
				edge='start'
				color='inherit'
				aria-label='menu'
				aria-controls={open ? "menu" : undefined}
				aria-haspopup='true'
				aria-expanded={open ? "true" : undefined}
			>
				<MenuIcon />
			</IconButton>
			<Menu
				id='menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
			>
				{/* TODO: what kind of items should we have in the menu? */}

				<Link to='/' style={{ textDecoration: "none" }}>
					<MenuItem divider sx={{ color: "text.primary" }}>
						Home
					</MenuItem>
				</Link>

				{user && <MenuItem onClick={handleSignOut}>Sign out</MenuItem>}
			</Menu>
		</>
	);
}

export default TopBarMenu;
