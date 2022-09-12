import { useState } from "react";
import {
	Checkbox,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	MenuItem,
	Box,
} from "@mui/material";
import { Menu as MenuIcon, DarkMode, LightMode } from "@mui/icons-material";

//TODO: Make this into more smaller components
//TODO: Refactor to have a better understanding of what happens
export default function TopBar({ colorMode, user }) {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<AppBar position='sticky' color='primary'>
			<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
				<div>
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
						<MenuItem>Profile</MenuItem>
						<MenuItem>Unlock grid</MenuItem>
						<MenuItem>Login / Logout</MenuItem>
					</Menu>
					<Checkbox
						onChange={colorMode.toggleColorMode}
						icon={<LightMode sx={{ color: "yellow" }} />}
						checkedIcon={<DarkMode sx={{ color: "white" }} />}
					/>
				</div>
				<Typography variant='h6'>Welcome home {user?.given_name}</Typography>
				{/* TODO: Make center on the top everytime, make instead of flex? */}
				<Box
					borderColor='textPrimary'
					sx={{
						border: "2px solid",
						padding: "10px",
					}}
				>
					<Typography variant='h6'>Weather info here</Typography>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
