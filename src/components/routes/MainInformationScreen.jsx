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
	const [bigComponentDialogIsOpen, setbigComponentDialogIsOpen] =
		useState(false);
	const [bigComponentValue, setbigComponentValue] = useState("Calendar");

	const [leftComponentDialogIsOpen, setleftComponentDialogIsOpen] =
		useState(false);
	const [leftComponentValue, setleftComponentValue] = useState("Tasks");

	const [rightComponentDialogIsOpen, setrightComponentDialogIsOpen] =
		useState(false);
	const [rightComponentValue, setrightComponentValue] = useState("Facts");

	const checkValue = (val) => {
		if (val === "Calendar")
			return (
				<Calendar
					googleApiToken={googleApiToken}
					chosenCalendars={chosenCalendars}
					setChosenCalendars={setChosenCalendars}
				/>
			);
		else if (val === "Tasks") {
			return <TasksList token={googleApiToken} />;
		} else if (val === "Facts") {
			return <FactOfTheDay />;
		}
		return "Something else";
	};

	//TODO: Make a dialog pop up when clicking on the unlocked grid. This should as for what component you want to show in that box.
	//TODO: After that refactor to smaller stuff.

	return (
		<>
			{/*Top/Big component area  */}
			{isGridUnlocked ? (
				<Box
					onClick={() => setbigComponentDialogIsOpen(true)}
					borderColor='textPrimary'
					gridArea='big-component'
					sx={unlockedAttributes}
				>
					{user ? checkValue(bigComponentValue) : ""}
				</Box>
			) : (
				<Box
					borderColor='textPrimary'
					gridArea='big-component'
					sx={lockedAttributes}
				>
					{user ? checkValue(bigComponentValue) : ""}
				</Box>
			)}
			{/*Left component area  */}
			{isGridUnlocked ? (
				<Box
					onClick={() => setleftComponentDialogIsOpen(true)}
					borderColor='textPrimary'
					gridArea='small-component-left'
					sx={unlockedAttributes}
				>
					{user ? checkValue(leftComponentValue) : ""}
				</Box>
			) : (
				<Box
					borderColor='textPrimary'
					gridArea='small-component-left'
					sx={lockedAttributes}
				>
					{user ? checkValue(leftComponentValue) : ""}
				</Box>
			)}
			{/*Right component area  */}
			{isGridUnlocked ? (
				<Box
					onClick={() => setrightComponentDialogIsOpen(true)}
					borderColor='textPrimary'
					gridArea='small-component-right'
					sx={unlockedAttributes}
				>
					{checkValue(rightComponentValue)}
				</Box>
			) : (
				<Box
					borderColor='textPrimary'
					gridArea='small-component-right'
					sx={lockedAttributes}
				>
					{checkValue(rightComponentValue)}
				</Box>
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
