import { Box, Typography } from "@mui/material";
import GridChoiceDialog from "../GridChoiceDialog";
import { Calendar, BusTable, FactOfTheDay } from "../";
import TasksList from "../TaskList/TasksList";
import { useState } from "react";
import { UserAuth } from "../contexts/UserAuthContext";

const boxStyle = {
	border: "2px solid",
	padding: "10px",
};

//TODO: Fix styling
export default function MainInformationScreen() {
	const { user } = UserAuth();
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
				if (user.user) {
					return <Calendar />;
				}
				return (
					<Typography variant='h5' align='center'>
						You must log in to use this widget
					</Typography>
				);
			case "Tasks":
				if (user.user) {
					return <TasksList />;
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

	//TODO: Refactor to smaller stuff / more readable stuff if possible

	return (
		<>
			{
				<>
					<Box
						onContextMenu={(event) => {
							event.preventDefault();
							setbigComponentDialogIsOpen(true);
						}}
						borderColor='textPrimary'
						gridArea='big-component'
						sx={boxStyle}
					>
						{returnComponent(bigComponentValue)}
					</Box>
					<Box
						onContextMenu={(event) => {
							event.preventDefault();
							setleftComponentDialogIsOpen(true);
						}}
						borderColor='textPrimary'
						gridArea='small-component-left'
						sx={boxStyle}
					>
						{returnComponent(leftComponentValue)}
					</Box>
					<Box
						onContextMenu={(event) => {
							event.preventDefault();
							setrightComponentDialogIsOpen(true);
						}}
						borderColor='textPrimary'
						gridArea='small-component-right'
						sx={boxStyle}
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
