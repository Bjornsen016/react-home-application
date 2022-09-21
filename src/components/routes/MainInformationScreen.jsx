import { Box, Typography } from "@mui/material";
import GridChoiceDialog from "../GridChoiceDialog";
import { Calendar, BusTable, FactOfTheDay } from "../";
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
				if (user) {
					return (
						<Calendar
							googleApiToken={googleApiToken}
							chosenCalendars={chosenCalendars}
							setChosenCalendars={setChosenCalendars}
						/>
					);
				}
				return (
					<Typography variant='h5' align='center'>
						You must log in to use this widget
					</Typography>
				);
			case "Tasks":
				if (user) {
					return <TasksList token={googleApiToken} />;
				}
				return (
					<Typography variant='h5' align='center'>
						You must log in to use this widget
					</Typography>
				);
			case "Facts":
				return <FactOfTheDay />;
			case "Bus":
				return <BusTable />;
			default:
				return "Something else";
		}
	};

	const addAttributes = () => {
		return isGridUnlocked ? unlockedAttributes : lockedAttributes;
	};

	const addUnlockedOnClickBig = () => {
		return isGridUnlocked ? () => setbigComponentDialogIsOpen(true) : () => {};
	};
	const addUnlockedOnClickLeft = () => {
		return isGridUnlocked ? () => setleftComponentDialogIsOpen(true) : () => {};
	};
	const addUnlockedOnClickRight = () => {
		return isGridUnlocked
			? () => setrightComponentDialogIsOpen(true)
			: () => {};
	};

	//TODO: Refactor to smaller stuff / more readable stuff if possible

	return (
		<>
			{
				<>
					<Box
						onClick={addUnlockedOnClickBig()}
						borderColor='textPrimary'
						gridArea='big-component'
						sx={addAttributes()}
					>
						{returnComponent(bigComponentValue)}
					</Box>
					<Box
						onClick={addUnlockedOnClickLeft()}
						borderColor='textPrimary'
						gridArea='small-component-left'
						sx={addAttributes()}
					>
						{returnComponent(leftComponentValue)}
					</Box>
					<Box
						onClick={addUnlockedOnClickRight()}
						borderColor='textPrimary'
						gridArea='small-component-right'
						sx={addAttributes()}
					>
						{returnComponent(rightComponentValue)}
					</Box>
				</>
			}

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
				choices={[{ value: "Tasks" }, { value: "Facts" }, { value: "Bus" }]}
			/>
			<GridChoiceDialog
				isOpen={rightComponentDialogIsOpen}
				setIsOpen={setrightComponentDialogIsOpen}
				setValue={setrightComponentValue}
				value={rightComponentValue}
				choices={[{ value: "Facts" }, { value: "Tasks" }, { value: "Bus" }]}
			/>
		</>
	);
}
