import { Divider, Typography } from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export const CalendarEvent = ({ event, index }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "10px 0",
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "#42a5f5" }}>
          {" "}
          {/* Pick from theme instead */}
          <CalendarMonthIcon />
        </Avatar>
      </ListItemAvatar>
      <div>
        <Typography sx={{ width: "90%" }} align="left" variant="h5" noWrap>
          {event.title}
        </Typography>
        <Typography sx={{ width: "90%" }} align="left" variant="p">
          {event.time}
        </Typography>
        <Divider
          sx={{ width: "40vw", maxWidth: "500px", minWidth: "250px" }}
          style={{ marginTop: "5px" }}
        />
      </div>
    </div>
  );
};
