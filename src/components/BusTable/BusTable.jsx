import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import { useEffect, useState } from "react";
import BusStopChoiceDialog from "./BusStopChoiceDialog";
import { busApiInfo } from "../../config/busApiInfo";

const { busClientId, busClientSecret, getTokenUrl, generateDepInfoUrl } =
	busApiInfo;

export default function BusTable() {
	const [depInfo, setDepInfo] = useState();
	const [stopId, setstopId] = useState(
		localStorage.getItem("stopId")
			? localStorage.getItem("stopId")
			: "9022014017320004"
	); //Pilgatan

	// 9022014005279002
	const [directionId, setdirectionId] = useState(
		localStorage.getItem("directionId")
			? localStorage.getItem("directionId")
			: "9022014017320004"
	); //Gråbo busstation
	const [accessToken, setAccessToken] = useState(null);
	const [isSearchDialogOpen, setisSearchDialogOpen] = useState(false);

	const getToken = async () => {
		const body = `grant_type=client_credentials&scope=device_123&client_id=${busClientId}&client_secret=${busClientSecret}`;
		const json = await fetch(getTokenUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: body,
		}).then((res) => res.json());
		setAccessToken(json);
		return json;
	};

	const getDepInfo = async (busStopId, directionStopId, token) => {
		const url = generateDepInfoUrl(busStopId, directionStopId);

		const data = await fetch(url, {
			metod: "GET",
			headers: {
				Authorization: `${token.token_type} ${token.access_token}`,
			},
		}).then((res) => res.json());

		return data;
	};

	const startUpdatingInterval = () => {
		return setInterval(() => {
			getToken().then((token) =>
				getDepInfo(stopId, directionId, token).then((depInfo) => {
					depInfo.DepartureBoard.Departure =
						depInfo.DepartureBoard.Departure.filter((item, index) => index < 5);
					setDepInfo(depInfo);
				})
			);
		}, 1000 * 55);
	};

	useEffect(() => {
		let interval;
		getToken().then((token) => {
			console.log(stopId);
			console.log(directionId);
			getDepInfo(stopId, directionId, token).then((depInfo) => {
				depInfo.DepartureBoard.Departure =
					depInfo.DepartureBoard.Departure.filter((item, index) => index < 5);
				setDepInfo(depInfo);
				interval = startUpdatingInterval();
			});
		});

		return () => {
			console.log("Removing bus interval");
			clearInterval(interval);
		};
	}, [stopId, directionId]);
	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<div>
				<Button
					onClick={() => {
						setisSearchDialogOpen((prev) => !prev);
					}}
					startIcon={<DepartureBoardIcon />}
				>
					Change stop
				</Button>

				{isSearchDialogOpen ? (
					<BusStopChoiceDialog
						accessToken={accessToken}
						isSearchDialogOpen={isSearchDialogOpen}
						setisSearchDialogOpen={setisSearchDialogOpen}
						setstopId={setstopId}
						setdirectionId={setdirectionId}
					/>
				) : (
					""
				)}

				{depInfo && (
					<TableContainer align='center' sx={{ maxWidth: 360, maxHeight: 295 }}>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<Typography variant='h6'>
								{depInfo.DepartureBoard.Departure[0]?.stop}
							</Typography>
							<Typography variant='h6'>
								{new Date(
									depInfo.DepartureBoard.serverdate +
										" " +
										depInfo.DepartureBoard.servertime
								).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}
							</Typography>
						</div>
						<Table align='center' size='small'>
							<TableHead>
								<TableRow sx={{ background: "#212529" }}>
									<TableCell
										sx={{ width: "10%", borderBottom: "none", color: "white" }}
									>
										Line
									</TableCell>
									<TableCell
										sx={{ borderBottom: "none", width: "50%", color: "white" }}
									>
										Direction
									</TableCell>
									<TableCell
										align='right'
										sx={{ width: "40%", borderBottom: "none", color: "white" }}
									>
										Departure time
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{depInfo.DepartureBoard.Departure?.map((dep, index) => (
									<TableRow
										key={`table-row: ${index}`}
										sx={
											index % 2
												? { background: "#212529" }
												: { background: "#2c3034" }
										}
									>
										<TableCell sx={{ borderBottom: "none" }}>
											<span
												style={{
													color: `${dep.fgColor}`,
													backgroundColor: `${dep.bgColor}`,
													fontSize: "1.2rem",
													paddingLeft: "4px",
													paddingRight: "4px",
													fontWeight: "bold",
												}}
											>
												{dep.sname}
											</span>
										</TableCell>
										<TableCell
											sx={{
												borderBottom: "none",
												color: "white",
												textOverflow: "ellipsis",
												width: 156,
											}}
										>
											{dep.direction.indexOf(",") !== -1
												? dep.direction.substring(0, dep.direction.indexOf(","))
												: dep.direction}
										</TableCell>
										<TableCell
											align='right'
											sx={{ borderBottom: "none", color: "white" }}
										>
											{`${dep.rtTime} (${printDepartureTime(depInfo, dep)}m)`}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</div>
		</div>
	);
}

const printDepartureTime = (depInfo, dep) => {
	return (
		Math.abs(
			new Date(
				depInfo.DepartureBoard.serverdate +
					" " +
					depInfo.DepartureBoard.servertime
			).getTime() - new Date(dep.rtDate + " " + dep.rtTime)
		) /
		1000 /
		60
	);
};
