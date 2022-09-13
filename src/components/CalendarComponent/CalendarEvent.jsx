import { Typography } from "@mui/material";
export const CalendarEvent = ({ event }) => {
	return (
		<div>
			<Typography variant='h5' align='center'>
				{event.time}: {event.title}
			</Typography>
			<Typography variant='body1' align='center'>
				{event.description}
			</Typography>
		</div>
	);
};
