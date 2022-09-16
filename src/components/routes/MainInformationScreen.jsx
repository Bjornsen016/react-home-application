import { Box, Button } from "@mui/material";
import { FactOfTheDay } from "../index";
import TasksList from "../TaskList/TasksList";

//TODO: Fix styling
export default function MainInformationScreen({ user, googleApiToken }) {
  return (
    <>
      <Box
        borderColor="textPrimary"
        sx={{
          border: "2px solid",
          gridColumn: "span 2",
          padding: "10px",
        }}
      >
        <Button onClick={() => console.log(user)}>Log user</Button>
        Calender + other components here
      </Box>
      <Box
        borderColor="textPrimary"
        sx={{
          border: "2px solid",
          gridColumn: "span 1",
          padding: "10px",
        }}
      >
        {user !== undefined ? <TasksList token={googleApiToken} /> : ""}
      </Box>
      <Box
        borderColor="textPrimary"
        sx={{
          border: "2px solid",
          gridColumn: "span 1",
          padding: "10px",
        }}
      >
        <FactOfTheDay></FactOfTheDay>
      </Box>
    </>
  );
}
