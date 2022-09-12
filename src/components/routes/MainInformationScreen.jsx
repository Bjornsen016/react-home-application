import { Box } from "@mui/material";
//import Calender from "../Calender";

//TODO: Fix styling
export default function MainInformationScreen() {
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
				{/* <Button onClick={() => login()}>Login with google</Button>
				 */}
				{/* <Calender /> */}
				Calender + other components here
			</Box>
			<Box
				borderColor='textPrimary'
				sx={{
					border: "2px solid",
					gridColumn: "span 1",
					padding: "10px",
				}}
			>
				{/* {user !== undefined ? <div>Hej {user.given_name}</div> : ""} */}
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
