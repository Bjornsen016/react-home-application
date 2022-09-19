import { useState } from "react";
import "./styles.css";
import { FormControlLabel, List, ListItem } from "@mui/material";
import PropTypes from "prop-types";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UncheckedCircleIcon from "@mui/icons-material/RadioButtonUnchecked";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Checkbox from "@mui/material/Checkbox";
import AddTaskForm from "./AddTaskForm";

function TabPanel({ list, value, index, getTasks, token, ...other }) {
  const label = { inputProps: { "aria-label": "Checkbox" } };
  const [open, setOpen] = useState(false);

  const onChangeCheckbox = (event) => {
    //event.target.checked (boolean)
  };

  const onChangeAddBtn = (event) => {
    setOpen(true);
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
            <>
              <ListItem className="task-item">
                <FormControlLabel
                  control={
                    <Checkbox
                      className="task-checkbox"
                      onChange={(e) => onChangeCheckbox(e)}
                      icon={<UncheckedCircleIcon />}
                      checkedIcon={<CheckCircleIcon />}
                      {...label}
                    />
                  }
                  label={item.title}
                />
              </ListItem>
            </>
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
