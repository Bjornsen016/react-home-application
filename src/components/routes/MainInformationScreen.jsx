import { Box, Button } from "@mui/material";
import TasksList from "../TasksList";

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
        {user !== undefined ? <div>Hej {user.names.givenName}</div> : ""}
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
        <ul>
          <li>TODOS</li>
          <li>Buss tabell</li>
          <li>Annat?</li>
        </ul>
      </Box>
    </>
  );
}
