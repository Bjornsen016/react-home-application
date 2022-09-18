import { Divider, Typography } from "@mui/material";
export const CalendarEvent = ({ event }) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Typography sx={{ width: "90%" }} align='center' variant='h5' noWrap>
				{event.title}
			</Typography>
			<Typography variant='h6'>{event.time}</Typography>
			<Divider sx={{ width: "50%" }} />
		</div>
	);
};
