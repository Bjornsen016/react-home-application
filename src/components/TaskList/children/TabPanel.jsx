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
import { deleteDataFromApi, patchDataToApi } from "../../utils/fetcher";
import { internal_processStyles } from "@mui/styled-engine";

function TabPanel({ list, value, index, getTasks, token, ...other }) {
  const label = { inputProps: { "aria-label": "Checkbox" } };
  const [open, setOpen] = useState(false);

  const onChangeCheckbox = async (event) => {
    let taskBody;

    if (!event.target.checked) {
      taskBody = { status: "needsAction" };
    } else {
      taskBody = { status: "completed" };
    }
    const taskUrl = event.target.value;

    await patchDataToApi(taskUrl, token, taskBody);
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
    await deleteDataFromApi(taskUrl, token);
    getTasks();
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <List className="task-list">
          {list.items.map((item) => (
            <ListItem key={item.id} className="task-item">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.status === "completed"}
                    value={item.selfLink}
                    className="task-checkbox"
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
                type="button"
                id={item.selfLink}
                color="error"
                fontSize="small"
              />
            </ListItem>
          ))}
          <ListItem className="task-item">
            <FormControlLabel
              control={
                <Checkbox
                  className="task-checkbox"
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
        token={token}
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
