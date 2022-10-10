import React, { useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	TextField,
} from "@mui/material";
import { UserAuth } from "../../contexts/GoogleApiCallsContext";

export default function AddTaskForm({ open, setOpen, listId, getTaskList }) {
	const taskUrl = new URL("https://content-tasks.googleapis.com");
	const orginPath = "/tasks/v1";
	const insertTaskUrl = `/lists/${listId}/tasks`;
	taskUrl.pathname = orginPath;
	taskUrl.pathname += insertTaskUrl;

	const [value, setValue] = useState(null);

	const { postDataToApi } = UserAuth();
	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async () => {
		const taskBody = { title: value };

		await postDataToApi(taskUrl, taskBody);

		taskUrl.pathname = orginPath;

		setOpen(false);
		setValue(null);

		getTaskList();
	};

	return (
		<Dialog open={open}>
			<DialogTitle>Add Task</DialogTitle>
			<TextField
				value={value}
				autoFocus
				margin='dense'
				id='task'
				type='text'
				variant='standard'
				style={{ padding: " 0 20px", minWidth: "300px" }}
				onChange={(e) => {
					setValue(e.target.value);
				}}
			/>
			<DialogActions>
				<Button onClick={handleClose}>Close</Button>
				<Button onClick={(e) => handleSubmit(e)}>Submit</Button>
			</DialogActions>
		</Dialog>
	);
}
