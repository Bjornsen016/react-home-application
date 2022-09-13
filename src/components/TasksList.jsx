import React, { useState } from "react";
import { List } from "@mui/material";

const TasksList = () => {
  const { taskList, setTaskList } = useState({});
  const { task, setTask } = useState({});

  const taskUrl = "https://Tasks.googleapis.com/tasks/v1/";
  const getTaskListsUrl = "users/@me/lists";
  const insertTaskUrl = `lists/${taskList}/tasks`;
  const updateTaskUrl = `lists/${taskList}/tasks/${task}`;
  const deleteTaskUrl = `lists/${taskList}/tasks/${task}`;

  return (
    <div>
      <li>Lorem ipsum</li>
    </div>
  );
};

export default TasksList;
