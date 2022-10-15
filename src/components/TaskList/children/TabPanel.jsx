import { useState } from "react";
import "./styles.css";
import { FormControlLabel, List, ListItem } from "@mui/material";
import PropTypes from "prop-types";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UncheckedCircleIcon from "@mui/icons-material/RadioButtonUnchecked";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Checkbox from "@mui/material/Checkbox";
import AddTaskForm from "./AddTaskForm";
import CloseIcon from "@mui/icons-material/Close";
import { UserAuth } from "../../contexts/GoogleApiCallsContext";

//TODO: Maybe we can send in only the tasklist and let the tabpanel make the call to get the tasks for their own.
//That way we can make the component independet of the actual parent and able to update the innerlist only, and not all the lists if something changes.
function TabPanel({ list, value, index, getTasks, ...other }) {
	const label = { inputProps: { "aria-label": "Checkbox" } };
	const [open, setOpen] = useState(false);
	const { deleteDataFromApi, patchDataToApi } = UserAuth();

	const onChangeCheckbox = async (event) => {
		let taskBody;

		if (!event.target.checked) {
			taskBody = { status: "needsAction" };
		} else {
			taskBody = { status: "completed" };
		}
		const taskUrl = event.target.value;

		await patchDataToApi(taskUrl, taskBody);
		getTasks();
	};

	const onChangeAddBtn = (event) => {
		setOpen(true);
	};

	const handleDelete = async (event) => {
		let taskUrl;

		if (event.target.id === "") {
			taskUrl = event.target.parentNode.id;
		} else {
			taskUrl = event.target.id;
		}

		//Delete Task
		await deleteDataFromApi(taskUrl);
		getTasks();
	};

	return (
		<div
			className='tab-panel'
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<List className='task-list'>
					{list.items.map((item) => (
						<ListItem key={item.id} className='task-item'>
							<FormControlLabel
								control={
									<Checkbox
										checked={item.status === "completed"}
										value={item.selfLink}
										className='task-checkbox'
										onChange={(e) => onChangeCheckbox(e)}
										icon={<UncheckedCircleIcon />}
										checkedIcon={<CheckCircleIcon />}
										{...label}
									/>
								}
								label={item.title}
							/>

							<CloseIcon
								onClick={(e) => handleDelete(e)}
								type='button'
								id={item.selfLink}
								color='error'
								fontSize='small'
								sx={{ cursor: "pointer" }}
							/>
						</ListItem>
					))}
					<ListItem className='task-item'>
						<FormControlLabel
							control={
								<Checkbox
									className='task-checkbox'
									onClick={(e) => onChangeAddBtn(e)}
									icon={<AddCircleIcon />}
									checkedIcon={<AddCircleIcon />}
								/>
							}
						/>
					</ListItem>
				</List>
			)}
			<AddTaskForm
				open={open}
				listId={list.listId}
				setOpen={setOpen}
				getTaskList={getTasks}
			/>
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

export default TabPanel;
