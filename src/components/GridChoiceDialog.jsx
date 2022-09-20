import {
	Dialog,
	DialogContent,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	DialogActions,
	Button,
} from "@mui/material";

export default function GridChoiceDialog({
	isOpen,
	setIsOpen,
	setValue,
	value,
	choices,
}) {
	const handleChange = (event) => {
		setValue(event.target.value);
	};

	return (
		<Dialog open={isOpen}>
			<DialogContent>
				<FormControl>
					<FormLabel id='radio-buttons-group'>
						What do you want to show in this slot?
					</FormLabel>
					<RadioGroup
						aria-labelledby='radio-buttons-group'
						name='controlled-radio-buttons-group'
						value={value}
						onChange={handleChange}
					>
						{choices?.map((choice) => (
							<FormControlLabel
								key={"choice: " + choice.value}
								value={choice.value}
								control={<Radio />}
								label={choice.value}
							/>
						))}
					</RadioGroup>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setIsOpen(false)} color='primary'>
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);
}
