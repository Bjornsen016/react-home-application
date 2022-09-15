import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {
	Button,
	FormGroup,
	FormControl,
	Checkbox,
	FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

export const CalenderListModal = ({
	isOpen,
	setIsOpen,
	calendarList,
	setChosenCalendars,
	callbackWhenFinished,
}) => {
	const handleSetCalendars = async (values) => {
		setChosenCalendars(values.calendars);
		await callbackWhenFinished(values.calendars);
		setIsOpen(false);
	};
	const handleCancel = async () => {
		console.log("Cancelled");
		setIsOpen(false);
	};

	const { control, handleSubmit } = useForm({
		defaultValues: {
			calendars: [],
		},
	});

	return (
		<Dialog open={isOpen}>
			<form onSubmit={handleSubmit(handleSetCalendars)}>
				<DialogTitle>Calendars</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Choose the calendars that you want to show.
					</DialogContentText>

					<FormControl component='fieldset'>
						<FormGroup>
							<Controller
								name='calendars'
								control={control}
								render={({ field }) => (
									<>
										{calendarList?.map((cal) => (
											<FormControlLabel
												key={cal.id}
												label={cal.summary}
												control={
													<Checkbox
														value={cal.id}
														checked={field.value.some(
															(existingValue) => existingValue === cal.id
														)}
														onChange={(event, checked) => {
															checked
																? field.onChange([
																		...field.value,
																		event.target.value,
																  ])
																: field.onChange(
																		field.value.filter(
																			(value) => value !== event.target.value
																		)
																  );
														}}
													/>
												}
											/>
										))}
									</>
								)}
							></Controller>
						</FormGroup>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button type='button' onClick={handleCancel} color='primary'>
						Cancel
					</Button>
					<Button type='submit' color='primary'>
						Save
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
