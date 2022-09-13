import { Box, Container, Typography } from "@mui/material";
import { CalendarEvent } from "./CalendarEvent";

const Calendar = ({ googleApiToken }) => {
	const flexStyle = {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
	};

	const testEvent = {
		title: "Veterinär besök",
		time: "12:00 - 12:30",
		description: "Anicura falun, svarta katten",
	};
	const testEvent2 = {
		title: "Koda!!!",
		time: "19:00 - 22:00",
		description: "Kötta på nu. Du kan göra det",
	};
	return (
		<Container style={{ height: "100%" }} sx={flexStyle} maxWidth='lg'>
			<Box style={flexStyle}>
				{/* Today box */}
				<Typography variant='h4' align='center' sx={{ marginBottom: "5px" }}>
					Monday, 7 nov 2022
				</Typography>
				<CalendarEvent event={testEvent} />
				{/* One event in this div and more divs if more events are happening today */}
				<CalendarEvent event={testEvent2} />
			</Box>
			<Box style={flexStyle}>
				{/* Upcoming box box */}
				<Typography variant='h4' align='center' sx={{ marginBottom: "5px" }}>
					UPCOMING
				</Typography>
				<div>
					<Typography variant='h5' align='center'>
						Monday, 5 dec, 19:00 - 22:00: Koda, koda, koda!!
					</Typography>
					<Typography variant='body1' align='center'>
						What is happening
					</Typography>
				</div>
				{/* One event in this div */}
				<div>
					<Typography variant='h5' align='center'>
						Heading for one event
					</Typography>
					<Typography variant='body1' align='center'>
						What is happening
					</Typography>
				</div>
				{/* One event in this div */}
			</Box>
		</Container>
	);
};

export default Calendar;
