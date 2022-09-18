import { Box } from "@mui/material";
import { Calendar } from "../";
import { FactOfTheDay } from "../index";
import TasksList from "../TaskList/TasksList";
import { useEffect } from "react";

//TODO: Fix styling
export default function MainInformationScreen({
	user,
	googleApiToken,
	chosenCalendars,
	setChosenCalendars,
	isGridUnlocked,
}) {
	let bigComponentStyle = {
		border: "2px solid",
		gridArea: "big-component",
		padding: "10px",
	};

	let bigComponentUnlockedStyle = {
		border: "2px dashed yellow",
		gridArea: "big-component",
		padding: "10px",
		cursor: "pointer",
	};

	//TODO: Make a dialog pop up when clicking on the unlocked grid. This should as for what component you want to show in that box.
	//TODO: After that refactor to smaller stuff.

	return (
		<>
			{isGridUnlocked ? (
				<Box
					onClick={() => console.log("you clicked the big unlocked grid")}
					borderColor='textPrimary'
					sx={bigComponentUnlockedStyle}
				>
					{user && (
						<Calendar
							googleApiToken={googleApiToken}
							chosenCalendars={chosenCalendars}
							setChosenCalendars={setChosenCalendars}
						/>
					)}
				</Box>
			) : (
				<Box borderColor='textPrimary' sx={bigComponentStyle}>
					{user && (
						<Calendar
							googleApiToken={googleApiToken}
							chosenCalendars={chosenCalendars}
							setChosenCalendars={setChosenCalendars}
						/>
					)}
				</Box>
			)}

			{isGridUnlocked ? (
				<Box
					onClick={() => console.log("you clicked the left unlocked grid")}
					borderColor='textPrimary'
					sx={{
						border: "2px dashed yellow",
						gridArea: "small-component-left",
						padding: "10px",
						cursor: "pointer",
					}}
				>
					{user && <TasksList token={googleApiToken} />}
				</Box>
			) : (
				<Box
					borderColor='textPrimary'
					sx={{
						border: "2px solid",
						gridArea: "small-component-left",
						padding: "10px",
					}}
				>
					{user && <TasksList token={googleApiToken} />}
				</Box>
			)}

			{isGridUnlocked ? (
				<Box
					onClick={() => console.log("you clicked the right unlocked grid")}
					borderColor='textPrimary'
					sx={{
						border: "2px dashed yellow",
						gridArea: "small-component-right",
						padding: "10px",
						cursor: "pointer",
					}}
				>
					<FactOfTheDay></FactOfTheDay>
				</Box>
			) : (
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
			)}
		</>
	);
}
