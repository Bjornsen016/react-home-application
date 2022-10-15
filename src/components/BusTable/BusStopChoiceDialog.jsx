import { useState, useEffect } from "react";
import {
	Autocomplete,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";
import { busApiInfo } from "../../config/busApiInfo";

const { generateSearchBusStopsUrl } = busApiInfo;

function BusStopChoiceDialog({
	accessToken,
	isSearchDialogOpen,
	setisSearchDialogOpen,
	setstopId,
	setdirectionId,
}) {
	const [stopOptions, setStopOptions] = useState([]);
	const [stopInputValue, setStopInputValue] = useState("");
	const [stopValue, setStopValue] = useState(null);
	const [stops, setStops] = useState([]);
	const [chosenStop, setChosenStop] = useState(null);

	const [directionStopOptions, setDirectionStopOptions] = useState([]);
	const [directionStopInputValue, setDirectionStopInputValue] = useState("");
	const [directionStopValue, setDirectionStopValue] = useState(null);
	const [directionStops, setDirectionStops] = useState([]);
	const [chosenDirectionStop, setChosenDirectionStop] = useState(null);

	//Stop autocomplete search
	useEffect(() => {
		if (stopInputValue === "") {
			setStopOptions(stopValue ? [stopValue] : []);
			return undefined;
		}

		searchBusStops(stopInputValue, accessToken).then((stops) => {
			const stopOptions = stops.map((stop) => stop.name);
			setStopOptions(stopOptions);
			setStops(stops);
		});
	}, [stopValue, stopInputValue]);

	//Direction stop autocomplete search
	useEffect(() => {
		if (directionStopInputValue === "") {
			setDirectionStopOptions(directionStopValue ? [directionStopValue] : []);
			return undefined;
		}

		searchBusStops(directionStopInputValue, accessToken).then((stops) => {
			const stopOptions = directionStops.map((stop) => stop.name);
			setDirectionStopOptions(stopOptions);
			setDirectionStops(stops);
		});
	}, [directionStopValue, directionStopInputValue]);

	return (
		<Dialog open={isSearchDialogOpen}>
			<DialogTitle>Search for the stop you want to see</DialogTitle>
			<DialogContent>
				<form
					onSubmit={(event) => {
						event.preventDefault();
						setstopId(chosenStop[0].id);
						localStorage.setItem("stopId", chosenStop[0].id);
						setdirectionId(chosenDirectionStop[0].id);
						localStorage.setItem("directionId", chosenDirectionStop[0].id);
						setisSearchDialogOpen((prev) => !prev);
					}}
				>
					<Container sx={{ display: "flex", flexDirection: "column" }}>
						<Autocomplete
							sx={{ padding: "20px 0" }}
							filterOptions={(x) => x}
							options={stopOptions}
							autoComplete
							includeInputInList
							filterSelectedOptions
							value={stopValue}
							onChange={(event, newValue) => {
								setStopOptions(
									newValue ? [newValue, ...stopOptions] : stopOptions
								);
								setStopValue(newValue);
							}}
							onInputChange={(event, newInputValue) => {
								setStopInputValue(newInputValue);
								const theStop = stops.filter(
									(stop) => stop.name === newInputValue
								);
								setChosenStop(theStop);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									label='Stop you want to watch'
									fullWidth
								/>
							)}
						/>
						<Autocomplete
							sx={{ padding: "20px 0" }}
							filterOptions={(x) => x}
							options={directionStopOptions}
							autoComplete
							includeInputInList
							filterSelectedOptions
							value={directionStopValue}
							onChange={(event, newValue) => {
								setDirectionStopOptions(
									newValue
										? [newValue, ...directionStopOptions]
										: directionStopOptions
								);
								setDirectionStopValue(newValue);
							}}
							onInputChange={(event, newInputValue) => {
								setDirectionStopInputValue(newInputValue);
								const theStop = directionStops.filter(
									(stop) => stop.name === newInputValue
								);
								setChosenDirectionStop(theStop);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									label='Stop you want to go towards'
									fullWidth
								/>
							)}
						/>
					</Container>
					<DialogActions>
						<Button onClick={() => setisSearchDialogOpen((prev) => !prev)}>
							Cancel
						</Button>
						<Button type='submit'>Ok</Button>
					</DialogActions>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default BusStopChoiceDialog;

const searchBusStops = async (searchWords, token) => {
	const url = generateSearchBusStopsUrl(searchWords);

	const data = await fetch(url, {
		metod: "GET",
		headers: {
			Authorization: `${token.token_type} ${token.access_token}`,
		},
	}).then((res) => res.json());

	return data.LocationList.StopLocation;
};
