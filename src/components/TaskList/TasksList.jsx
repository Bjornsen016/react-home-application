import React, { useState, useEffect, useCallback } from "react";
import { fetchDataFromApi } from "../utils/fetcher";
import { Tabs, Tab, Divider, CircularProgress } from "@mui/material";
import TabPanel from "./children/TabPanel";

//useMemo: Returns and stores the calculated value of a function in a variable
//useCallBack: Returns and stores the actual function itself in a variable

const TasksList = ({ token }) => {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [taskLists, setTaskLists] = useState();
  const [task, setTask] = useState([]);

  const taskUrl = new URL("https://content-tasks.googleapis.com");
  const orginPath = "/tasks/v1";
  const getTaskListsUrl = "/users/@me/lists";
  /* const getListOfTasksUrl = `/lists/${taskLists}/tasks`;
  const insertTaskUrl = `/lists/${taskLists}/tasks`;
  const updateTaskUrl = `/lists/${taskLists}/tasks/${task}`;
  const deleteTaskUrl = `/lists/${taskLists}/tasks/${task}`;
 */
  taskUrl.pathname = orginPath;

  const getTasks = useCallback(
    async (taskLists) => {
      console.log(taskLists.items);
      setTask([]);
      for (let i = 0; i < taskLists.items.length; i++) {
        taskUrl.pathname += "/lists/" + taskLists.items[i].id + "/tasks";
        const listOfTasksData = await fetchDataFromApi(taskUrl, token);
        const lista = {
          items: listOfTasksData.items,
          title: taskLists.items[i].title,
          listId: taskLists.items[i].id,
        };

        await setTask((prevTask) => [...prevTask, lista]);

        taskUrl.pathname = orginPath;
        setLoading(false);
      }
    },
    [taskUrl, token]
  );

  const getTaskList = useCallback(async () => {
    taskUrl.pathname += getTaskListsUrl;
    const taskLists = await fetchDataFromApi(taskUrl, token);
    await setTaskLists(taskLists);
    taskUrl.pathname = orginPath;
    console.log("tasklistset", taskLists);
    getTasks(taskLists);
  }, [getTasks, taskUrl, token]);

  useEffect(() => {
    getTaskList(getTaskListsUrl);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {loading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Tabs value={value} onChange={handleChange}>
            {task.map((list) => (
              <Tab label={list.title} />
            ))}
          </Tabs>
          <Divider />
          {task.map((list, index) => (
            <TabPanel
              list={list}
              index={index}
              value={value}
              getTasks={getTaskList}
              token={token}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default TasksList;
