import HistoryOfYheDay from "./HistoryOfTheDay";

import { React, useState } from "react";
import Box from "@mui/material/Box";

export default function FactOfTheDay() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <HistoryOfYheDay></HistoryOfYheDay>
    </Box>
  );
}
