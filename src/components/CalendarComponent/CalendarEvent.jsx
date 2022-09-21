import { Divider, Typography, Box } from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export const CalendarEvent = ({ event }) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				padding: "10px 0",
				justifyContent: { xs: "center", sm: "left" },
			}}
		>
			<ListItemAvatar sx={{ display: { xs: "none", sm: "block" } }}>
				<Avatar sx={{ bgcolor: "#42a5f5" }}>
					{" "}
					{/* Pick from theme instead? */}
					<CalendarMonthIcon />
				</Avatar>
			</ListItemAvatar>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					/* justifyContent: { xs: "center", sm: "left" }, */
					alignItems: "center",
					width: "90%",
				}}
			>
				<Typography
					sx={{
						width: "90%",
						textAlign: { xs: "center", sm: "left" },
						textOverflow: { xs: "clip", sm: "ellipsis" },
					}}
					variant='h5'
					/* noWrap */
				>
					{event.title}
				</Typography>
				<Typography
					sx={{
						width: "90%",
						textAlign: { xs: "center", sm: "left" },
					}}
					variant='p'
				>
					{event.time}
				</Typography>
				<Divider
					sx={{
						width: "90%",
						maxWidth: "500px",
					}}
					style={{ marginTop: "5px" }}
				/>
			</Box>
		</Box>
	);
};
