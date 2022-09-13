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

	setInterval(updateTime, 1000);

	return <Typography variant='h6'>{currentTime}</Typography>;
}

export default Clock;
