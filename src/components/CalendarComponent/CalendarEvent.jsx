import { Divider, Typography } from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

export const CalendarEvent = ({ event, index }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ color: "primary" }}>{index + 1}</Avatar>
      </ListItemAvatar>
      <div>
        <Typography sx={{ width: "90%" }} align="left" variant="h5" noWrap>
          {event.title}
        </Typography>
        <Typography sx={{ width: "90%" }} align="left" variant="p">
          {event.time}
        </Typography>
        <Divider sx={{ width: "90%" }} style={{ marginTop: "5px" }} />
      </div>
    </div>
  );
};
