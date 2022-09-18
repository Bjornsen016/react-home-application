import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";

export default function BusTable() {
	const testData = {
		DepartureBoard: {
			serverdate: "2022-09-19",
			servertime: "19:00",
			Departure: [
				{
					stop: "Gråbo busstation, Lerum",
					sname: "X3",
					direction: "Kullavik",
					time: "23:36",
					fgColor: "rgb(212, 0, 162)",
					bgColor: "rgb(255, 255, 80)",
				},
				{
					stop: "Gråbo busstation, Lerum",
					sname: "X3",
					direction: "Kullavik",
					time: "23:37",
					fgColor: "rgb(212, 0, 162)",
					bgColor: "rgb(255, 255, 80)",
				},
				{
					stop: "Gråbo busstation, Lerum",
					sname: "X3",
					direction: "Kullavik",
					time: "23:37",
					fgColor: "rgb(212, 0, 162)",
					bgColor: "rgb(255, 255, 80)",
				},
				{
					stop: "Gråbo busstation, Lerum",
					sname: "X3",
					direction: "Kullavik",
					time: "23:37",
					fgColor: "rgb(212, 0, 162)",
					bgColor: "rgb(255, 255, 80)",
				},
				{
					stop: "Gråbo busstation, Lerum",
					sname: "X3",
					direction: "Kullavik",
					time: "23:37",
					fgColor: "rgb(212, 0, 162)",
					bgColor: "rgb(255, 255, 80)",
				},
			],
		},
	};

	//TODO: Get the data and then show the information.
	//TODO: Style to look like the dep board that Västtrafik have.
	//TODO: Make useEffect that updates everything once every 1 min.
	return (
		<TableContainer>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<Typography variant='h6'>
					{testData.DepartureBoard.Departure[0]?.stop}
				</Typography>
				<Typography variant='h6'>
					{new Date(Date.now()).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</Typography>
			</div>
			<Table align='center' size='small' sx={{ maxWidth: 350 }}>
				<TableHead>
					<TableRow sx={{ background: "#212529" }}>
						<TableCell sx={{ width: "63px", borderBottom: "none" }}>
							Bus
						</TableCell>
						<TableCell sx={{ borderBottom: "none" }}>Direction</TableCell>
						<TableCell align='right' sx={{ borderBottom: "none" }}>
							Departure time
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{testData.DepartureBoard.Departure?.map((dep, index) => (
						//Stop after x index.
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
							<TableCell sx={{ borderBottom: "none" }}>
								{dep.direction}
							</TableCell>
							<TableCell align='right' sx={{ borderBottom: "none" }}>
								{dep.time}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
