import { Typography } from "@mui/material";
export const CalendarEvent = ({ event }) => {
	return (
		<div>
			<Typography variant='h5' align='center'>
				{event.title}
			</Typography>
			<Typography variant='h6' align='center'>
				{event.time}
			</Typography>
		</div>
	);
};
