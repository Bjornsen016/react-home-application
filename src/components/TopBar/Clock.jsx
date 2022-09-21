import { Typography } from "@mui/material";
import { useState } from "react";

function Clock() {
  let time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const [currentTime, setCurrentTime] = useState(time);

  const updateTime = () => {
    time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setCurrentTime(time);
  };

  setInterval(updateTime, 1000); //TODO: Probably use useEffect or something to dispose of the interval to save from memoryleak

  return (
    <Typography variant="h3" sx={{ fontSize: { xs: "30px", sm: "40px" } }}>
      {currentTime}
    </Typography>
  );
}

export default Clock;
