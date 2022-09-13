import React, { useState, useEffect } from "react";
import { fetchDataFromApi } from "./utils/fetcher";
import { Tabs, Tab } from "@mui/material";

const TasksList = ({ token }) => {
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [taskLists, setTaskLists] = useState();
  const [task, setTask] = useState();

  const taskUrl = new URL("https://content-tasks.googleapis.com");
  const orginPath = "/tasks/v1";
  const getTaskListsUrl = "/users/@me/lists";
  const getListOfTasksUrl = `/lists/${taskLists}/tasks`;
  const insertTaskUrl = `/lists/${taskLists}/tasks`;
  const updateTaskUrl = `/lists/${taskLists}/tasks/${task}`;
  const deleteTaskUrl = `/lists/${taskLists}/tasks/${task}`;

  taskUrl.pathname = orginPath;

  const getTaskList = async (urlPath) => {
    taskUrl.pathname += urlPath;

    const taskListData = await fetchDataFromApi(taskUrl, token).then(
      setLoading(false).then(setList).then(getTasks)
    );

    taskUrl.pathname = orginPath;

    const setList = async () => {
      await setTaskLists(taskListData);
    };

    //setList().then(getTasks);

    console.log(taskListData);
  };

  const getTasks = async (taskLists) => {
    console.log(taskLists.items);

    for (let i = 0; i < taskLists.items.length; i++) {
      taskUrl.pathname += "/lists/" + taskLists.items[i].id + "/tasks";
      const listOfTasksData = await fetchDataFromApi(taskUrl, token);

      taskUrl.pathname = orginPath;

      console.log(listOfTasksData);
    }
  };

  useEffect(() => {
    getTaskList(getTaskListsUrl);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          taskLists.items.map((list) => {
            return <Tab label={list.title} />;
          })
        )}
      </Tabs>
    </div>
  );
};

export default TasksList;
