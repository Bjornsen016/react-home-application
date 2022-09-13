import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import LoginWithGoogle from "./LoginWithGoogle";
import { googleLogout } from "@react-oauth/google";

function TopBarMenu({ user, setGoogleApiToken, setUser }) {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
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
				<MenuItem>Profile</MenuItem>
				<MenuItem>Unlock grid</MenuItem>

				{user && (
					<MenuItem
						onClick={() => {
							googleLogout();
							setUser();
							setGoogleApiToken();
							console.log(user);
							handleClose();
						}}
					>
						Sign out
					</MenuItem>
				)}
				{!user && (
					<LoginWithGoogle
						setGoogleApiToken={setGoogleApiToken}
						setUser={setUser}
						closeMenu={handleClose}
					/>
				)}
			</Menu>
		</>
	);
}

export default TopBarMenu;
