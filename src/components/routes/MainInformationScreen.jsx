import { Box, Button } from "@mui/material";
import { Calendar } from "../";

//TODO: Fix styling
export default function MainInformationScreen({ user, googleApiToken }) {
	return (
		<>
			<Box
				borderColor='textPrimary'
				sx={{
					border: "2px solid",
					gridColumn: "span 2",
					padding: "10px",
				}}
			>
				{/* <Button onClick={() => console.log(user)}>Log user</Button> */}
				{user && <Calendar googleApiToken={googleApiToken} />}
			</Box>
			<Box
				borderColor='textPrimary'
				sx={{
					border: "2px solid",
					gridColumn: "span 1",
					padding: "10px",
				}}
			>
				{user !== undefined ? <div>Hej {user.names.givenName}</div> : ""}
				<ul>
					<li>TODOS</li>
					<li>Buss tabell</li>
					<li>Annat?</li>
				</ul>
			</Box>
			<Box
				borderColor='textPrimary'
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
