import { Box } from "@mui/material";
import {HistoryOfYheDay, NameOfYheDay, JokeOfTheDay} from "../index"
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
				
				
			</Box>
			<Box
				borderColor='textPrimary'
				sx={{
					border: "2px solid",
					gridColumn: "span 1",
					padding: "10px",
				}}
			>
			
			   
		 	  <NameOfYheDay></NameOfYheDay> 
				
			</Box>
		</>
	);
}
