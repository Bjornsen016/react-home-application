import { Box, Container, Typography } from "@mui/material";
import { CalendarEvent } from "./CalendarEvent";
import { CalenderListModal } from "./CalenderListModal";
import { fetchDataFromApi } from "../utils/fetcher";
import { useEffect, useState } from "react";

const baseUrl = new URL("https://www.googleapis.com");

const Calendar = ({ googleApiToken }) => {
	const flexStyle = {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
	};

	const testEvent = {
		title: "Veterinär besök",
		time: "12:00 - 12:30",
		description: "Anicura falun, svarta katten",
	};
	const testEvent2 = {
		title: "Koda!!!",
		time: "19:00 - 22:00",
		description: "Kötta på nu. Du kan göra det",
	};

	const [showCalenderListModal, setShowCalenderListModal] = useState(false);
	const [calendarList, setCalendarList] = useState([]);
	const [chosenCalendars, setChosenCalendars] = useState([]);
	const [events, setEvents] = useState([]);

	const getCalendars = async () => {
		const url = new URL(baseUrl);
		url.pathname = "/calendar/v3/users/me/calendarList";
		const data = await fetchDataFromApi(url, googleApiToken);
		return data.items;
	};

	const compareDates = (a, b) => {
		if (a.start.dateTime !== undefined && b.start.dateTime !== undefined)
			return new Date(a.start.dateTime) - new Date(b.start.dateTime);
		else if (a.start.dateTime !== undefined && b.start.dateTime === undefined)
			return new Date(a.start.dateTime) - new Date(b.start.date);
		else if (a.start.dateTime === undefined && b.start.dateTime !== undefined)
			return new Date(a.start.date) - new Date(b.start.dateTime);
	};

	const getEvents = async (calendars) => {
		const apiEvents = await fetchEvents(calendars, 10); // The number is how many events PER calendar
		Promise.all(apiEvents).then((evts) => {
			let allEvents = [];
			evts.forEach((evs) => {
				allEvents = allEvents.concat(evs);
			});

			//Sort the events by date

			allEvents = allEvents.sort((a, b) => compareDates(a, b));
			console.log(
				"Sorted events",
				allEvents.map((e) => {
					if (e.start.dateTime !== undefined)
						return `${e.start.dateTime}: ${e.summary}`;
					else return `${e.start.date}: ${e.summary}`;
				})
			);

			//The number of events to show
			//TODO: Devide between events happening today and happening other days and show them down below
			allEvents = allEvents.slice(0, 6);

			const toOnlyTime = (dateTimeString) =>
				new Date(dateTimeString).toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				});

			allEvents = allEvents.map((evt) => {
				let time;
				if (
					evt.start.dateTime !== undefined &&
					evt.end.dateTime !== undefined
				) {
					time = `${toOnlyTime(evt.start.dateTime)} - ${toOnlyTime(
						evt.end.dateTime
					)}`;
				} else if (
					evt.start.dateTime !== undefined &&
					evt.end.dateTime === undefined
				) {
					time = `${toOnlyTime(evt.start.dateTime)}`;
				} else if (evt.start.date !== undefined && evt.end.date !== undefined) {
					time = `${toOnlyTime(evt.start.date)} - ${toOnlyTime(evt.end.date)}`;
				} else if (evt.start.date !== undefined && evt.end.date === undefined) {
					time = `${toOnlyTime(evt.start.date)}`;
				}
				let myEvent = { time: time, title: evt.summary };
				return myEvent;
			});

			console.log(
				"Sorted events",
				allEvents.map((e) => {
					return `${e.time}: ${e.summary}`;
				})
			);

			setEvents(allEvents);

			//Put them into the events state . setEvents(...).
		});
	};

	const fetchEvents = async (calendars, maxAmountPerCalendar) => {
		const apiEvents = calendars.map(async (calendar) => {
			const url = new URL(baseUrl);
			url.pathname = `/calendar/v3/calendars/${calendar}/events`;
			url.searchParams.set("maxResults", maxAmountPerCalendar);
			const today = new Date(Date.now()).toISOString();
			console.log("today", today);
			url.searchParams.set("timeMin", today);
			const data = await fetchDataFromApi(url, googleApiToken);

			return data.items;
		});
		return apiEvents;
	};

	useEffect(() => {
		getCalendars().then(async (items) => {
			await setCalendarList(items);
			setShowCalenderListModal(true);
		});
	}, []);

	return (
		<Container style={{ height: "100%" }} sx={flexStyle} maxWidth='lg'>
			<Box style={flexStyle}>
				{/* Today box */}
				<Typography variant='h4' align='center' sx={{ marginBottom: "5px" }}>
					Monday, 7 nov 2022
				</Typography>
				{events?.map((evt) => (
					<CalendarEvent event={evt} />
				))}
				{/* <CalendarEvent event={testEvent} /> */}
				{/* One event in this div and more divs if more events are happening today */}
				{/* <CalendarEvent event={testEvent2} /> */}
			</Box>
			<Box style={flexStyle}>
				{/* Upcoming box */}
				<Typography variant='h4' align='center' sx={{ marginBottom: "5px" }}>
					UPCOMING
				</Typography>
				<div>
					<Typography variant='h5' align='center'>
						Monday, 5 dec, 19:00 - 22:00: Koda, koda, koda!!
					</Typography>
					<Typography variant='body1' align='center'>
						What is happening
					</Typography>
				</div>
				{/* One event in this div */}
				<div>
					<Typography variant='h5' align='center'>
						Heading for one event
					</Typography>
					<Typography variant='body1' align='center'>
						What is happening
					</Typography>
				</div>
				{/* One event in this div */}
			</Box>
			<CalenderListModal
				isOpen={showCalenderListModal}
				setIsOpen={setShowCalenderListModal}
				calendarList={calendarList}
				setChosenCalendars={setChosenCalendars}
				callbackWhenFinished={getEvents}
			/>
		</Container>
	);
};

export default Calendar;
