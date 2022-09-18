import { Box } from "@mui/material";
import GridChoiceDialog from "../GridChoiceDialog";
import { Calendar } from "../";
import { FactOfTheDay } from "../index";
import TasksList from "../TaskList/TasksList";
import { useState } from "react";

const unlockedAttributes = {
	border: "2px dashed yellow",
	padding: "10px",
	cursor: "pointer",
};

const lockedAttributes = {
	border: "2px solid",
	padding: "10px",
};

//TODO: Fix styling
export default function MainInformationScreen({
	user,
	googleApiToken,
	chosenCalendars,
	setChosenCalendars,
	isGridUnlocked,
}) {
	//TODO: Save the values in local storage so that next time you open the app it remembers
	const [bigComponentDialogIsOpen, setbigComponentDialogIsOpen] =
		useState(false);
	const [bigComponentValue, setbigComponentValue] = useState("Calendar");

	const [leftComponentDialogIsOpen, setleftComponentDialogIsOpen] =
		useState(false);
	const [leftComponentValue, setleftComponentValue] = useState("Tasks");

	const [rightComponentDialogIsOpen, setrightComponentDialogIsOpen] =
		useState(false);
	const [rightComponentValue, setrightComponentValue] = useState("Facts");

	const returnComponent = (value) => {
		switch (value) {
			case "Calendar":
				return (
					<Calendar
						googleApiToken={googleApiToken}
						chosenCalendars={chosenCalendars}
						setChosenCalendars={setChosenCalendars}
					/>
				);
			case "Tasks":
				return <TasksList token={googleApiToken} />;
			case "Facts":
				return <FactOfTheDay />;
			default:
				return "Something else";
		}
	};

	//TODO: Refactor to smaller stuff / more readable stuff if possible

	return (
		<>
			{isGridUnlocked ? (
				<>
					<Box
						onClick={() => setbigComponentDialogIsOpen(true)}
						borderColor='textPrimary'
						gridArea='big-component'
						sx={unlockedAttributes}
					>
						{user ? returnComponent(bigComponentValue) : ""}
					</Box>
					<Box
						onClick={() => setleftComponentDialogIsOpen(true)}
						borderColor='textPrimary'
						gridArea='small-component-left'
						sx={unlockedAttributes}
					>
						{user ? returnComponent(leftComponentValue) : ""}
					</Box>
					<Box
						onClick={() => setrightComponentDialogIsOpen(true)}
						borderColor='textPrimary'
						gridArea='small-component-right'
						sx={unlockedAttributes}
					>
						{returnComponent(rightComponentValue)}
					</Box>
				</>
			) : (
				<>
					<Box
						borderColor='textPrimary'
						gridArea='big-component'
						sx={lockedAttributes}
					>
						{user ? returnComponent(bigComponentValue) : ""}
					</Box>
					<Box
						borderColor='textPrimary'
						gridArea='small-component-left'
						sx={lockedAttributes}
					>
						{user ? returnComponent(leftComponentValue) : ""}
					</Box>
					<Box
						borderColor='textPrimary'
						gridArea='small-component-right'
						sx={lockedAttributes}
					>
						{returnComponent(rightComponentValue)}
					</Box>
				</>
			)}

			{/* The different dialogs to choose what to show */}
			<GridChoiceDialog
				isOpen={bigComponentDialogIsOpen}
				setIsOpen={setbigComponentDialogIsOpen}
				setValue={setbigComponentValue}
				value={bigComponentValue}
				choices={[
					{ value: "Calendar" },
					{ value: "Tasks" },
					{ value: "Facts" },
				]}
			/>
			<GridChoiceDialog
				isOpen={leftComponentDialogIsOpen}
				setIsOpen={setleftComponentDialogIsOpen}
				setValue={setleftComponentValue}
				value={leftComponentValue}
				choices={[{ value: "Tasks" }, { value: "Facts" }]}
			/>
			<GridChoiceDialog
				isOpen={rightComponentDialogIsOpen}
				setIsOpen={setrightComponentDialogIsOpen}
				setValue={setrightComponentValue}
				value={rightComponentValue}
				choices={[{ value: "Facts" }, { value: "Tasks" }]}
			/>
		</>
	);
}
