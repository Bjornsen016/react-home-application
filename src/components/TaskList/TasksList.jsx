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

  taskUrl.pathname = orginPath;

  const getTasks = async (lists) => {
    const newTaskList = [];

    for (let i = 0; i < lists.items.length; i++) {
      taskUrl.pathname += "/lists/" + lists.items[i].id + "/tasks";
      taskUrl.searchParams.set("showHidden", "True");
      const listOfTasksData = await fetchDataFromApi(taskUrl, token);
      const taskObjectList = {
        items: listOfTasksData.items,
        title: lists.items[i].title,
        listId: lists.items[i].id,
      };

      newTaskList.push(taskObjectList);

      taskUrl.pathname = orginPath;
      setLoading(false);
    }

    //sort completed tasks last.
    const sortedTaskObjects = newTaskList.map((taskList) => {
      taskList.items = taskList.items.sort((a, b) => {
        return b.status.length - a.status.length;
      });
      return taskList;
    });

    setTask(sortedTaskObjects);
  };

  const getTaskList = async () => {
    taskUrl.pathname += getTaskListsUrl;
    const lists = await fetchDataFromApi(taskUrl, token);
    await setTaskLists(lists);
    taskUrl.pathname = orginPath;
    getTasks(lists);
  };

  useEffect(() => {
    //Added the timeout to let the system get the ApiKey from localStorage if there is one.
    let interval;
    setTimeout(() => {
      getTaskList(getTaskListsUrl);
      interval = setInterval(() => {
        getTaskList(getTaskListsUrl);
      }, 1000 * 60 * 5);
    }, 500);
    return clearInterval(interval);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ height: "100%" }}>
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
              key={list.id}
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
