import { Box } from "@mui/material";
import { Calendar } from "../";
import { FactOfTheDay } from "../index";
import TasksList from "../TaskList/TasksList";

//TODO: Fix styling
export default function MainInformationScreen({
	user,
	googleApiToken,
	chosenCalendars,
	setChosenCalendars,
}) {
	return (
		<>
			<Box
				borderColor='textPrimary'
				sx={{
					border: "2px solid",
					gridArea: "big-component",
					padding: "10px",
				}}
			>
				{user && (
					<Calendar
						googleApiToken={googleApiToken}
						chosenCalendars={chosenCalendars}
						setChosenCalendars={setChosenCalendars}
					/>
				)}
			</Box>
			<Box
				borderColor='textPrimary'
				sx={{
					border: "2px solid",
					gridArea: "small-component-left",
					padding: "10px",
				}}
			>
				{user !== undefined ? <TasksList token={googleApiToken} /> : ""}
			</Box>
			<Box
				borderColor='textPrimary'
				sx={{
					border: "2px solid",
					gridArea: "small-component-right",
					padding: "10px",
				}}
			>
				<FactOfTheDay></FactOfTheDay>
			</Box>
		</>
	);
}
