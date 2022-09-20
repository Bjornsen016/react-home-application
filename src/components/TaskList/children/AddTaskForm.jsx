import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";
import { postDataToApi } from "../../utils/fetcher";

export default function AddTaskForm({
  open,
  setOpen,
  listId,
  getTaskList,
  token,
}) {
  const taskUrl = new URL("https://content-tasks.googleapis.com");
  const orginPath = "/tasks/v1";
  const insertTaskUrl = `/lists/${listId}/tasks`;
  taskUrl.pathname = orginPath;
  taskUrl.pathname += insertTaskUrl;

  const [value, setValue] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const taskBody = { title: value };

    await postDataToApi(taskUrl, token, taskBody);

    taskUrl.pathname = orginPath;

    getTaskList();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Add Task</DialogTitle>
      <TextField
        value={value}
        autoFocus
        margin="dense"
        id="task"
        type="text"
        variant="standard"
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
