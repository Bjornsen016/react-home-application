import { Box, Typography, Container } from "@mui/material";
import { CalendarEvent } from "./CalendarEvent";

const flexStyle = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-around",
};

export const EventsContainer = ({ events, upcoming }) => {
	return (
		<Box style={flexStyle}>
			<Typography
				variant='p'
				align='center'
				sx={{
					marginBottom: "5px",
					color: "primary.main",
					textTransform: upcoming === "UPCOMING" ? "uppercase" : "",
				}}
			>
				{upcoming === "UPCOMING"
					? "Upcoming..."
					: new Date(Date.now())
							.toLocaleDateString("en-GB", {
								weekday: "long",
								year: "numeric",
								month: "short",
								day: "numeric",
							})
							.toLocaleUpperCase()}
			</Typography>
			{events?.length === 0 ? (
				upcoming === "UPCOMING" ? (
					""
				) : (
					<Typography variant='p' align='center' sx={{ paddingBottom: "20px" }}>
						There are no events today. Feel free to roam...
					</Typography>
				)
			) : (
				<Container
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						width: {
							xs: "90%",
							sm: "80%",
							md: "70%",
							lg: "550px",
							xl: "550px",
						},
						maxWidth: "550px",
					}}
				>
					{events?.map((evt) => (
						<CalendarEvent key={evt.id} event={evt} />
					))}
				</Container>
			)}
		</Box>
	);
};
