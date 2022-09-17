import { Box, Container, Typography } from "@mui/material";
import { CalendarEvent } from "./CalendarEvent";
import { CalenderListModal } from "./CalenderListModal";
import { fetchDataFromApi } from "../utils/fetcher";
import { useEffect, useState } from "react";

const baseUrl = new URL("https://www.googleapis.com");
const flexStyle = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-around",
};

const Calendar = ({ googleApiToken, chosenCalendars, setChosenCalendars }) => {
	const [showCalenderListModal, setShowCalenderListModal] = useState(false);
	const [calendarList, setCalendarList] = useState([]);
	const [todaysEvents, setTodaysEvents] = useState([]);
	const [upcomingEvents, setUpcomingEvents] = useState([]);

	const getCalendars = async () => {
		const url = new URL(baseUrl);
		url.pathname = "/calendar/v3/users/me/calendarList";
		const data = await fetchDataFromApi(url, googleApiToken);
		return data.items;
	};

	const fetchEvents = async (calendars, maxAmountPerCalendar) => {
		const apiEvents = calendars.map(async (calendar) => {
			const url = new URL(baseUrl);
			url.pathname = `/calendar/v3/calendars/${calendar}/events`;
			url.searchParams.set("maxResults", maxAmountPerCalendar);
			const today = new Date(Date.now()).toISOString();
			url.searchParams.set("timeMin", today);

			const data = await fetchDataFromApi(url, googleApiToken);
			return data.items;
		});
		return apiEvents;
	};

	const getEvents = async (calendars) => {
		const apiEvents = await fetchEvents(calendars, 10); // The number is how many events PER calendar
		Promise.all(apiEvents).then((evts) => {
			let allEvents = [];
			evts.forEach((evs) => {
				allEvents = allEvents.concat(evs);
			});

			//Sort the events by date
			allEvents = allEvents.sort((a, b) => sortDatesByEarliestFirst(a, b));

			//The number of events to show
			allEvents = allEvents.slice(0, 6);

			let todaysEvents = allEvents.filter((e) => isEventStartTodayOrEarlier(e));
			let upcomingEvents = allEvents.filter(
				(e) => !isEventStartTodayOrEarlier(e)
			);

			todaysEvents = todaysEvents.map(createTodaysEvents);

			upcomingEvents = upcomingEvents.map(createUpcomingEvents);

			setTodaysEvents(todaysEvents);
			setUpcomingEvents(upcomingEvents);

			//TODO: Make an interval to update the state. every 10 min? 15, 30?
			//TODO: TIME TO REFACTOR
		});
	};

	useEffect(() => {
		if (chosenCalendars?.length > 0) {
			getEvents(chosenCalendars);
		} else {
			getCalendars().then(async (items) => {
				setCalendarList(items);
				setShowCalenderListModal(true);
			});
		}
	}, []);

	return (
		<Container style={{ height: "100%" }} sx={flexStyle} maxWidth='lg'>
			<Box style={flexStyle}>
				{/* Today box */}
				<Typography variant='h4' align='center' sx={{ marginBottom: "5px" }}>
					{new Date(Date.now()).toLocaleDateString("en-GB", {
						weekday: "long",
						year: "numeric",
						month: "short",
						day: "numeric",
					})}
				</Typography>
				{todaysEvents?.length === 0 ? (
					<Typography variant='h5' align='center'>
						There are no events today. Feel free to roam
					</Typography>
				) : (
					todaysEvents?.map((evt) => <CalendarEvent event={evt} />)
				)}
			</Box>
			<Box style={flexStyle}>
				{/* Upcoming box */}
				<Typography variant='h4' align='center' sx={{ marginBottom: "5px" }}>
					UPCOMING
				</Typography>
				{upcomingEvents?.map((evt) => (
					<CalendarEvent event={evt} />
				))}
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

//Helper functions
const sortDatesByEarliestFirst = (a, b) => {
	if (a.start.dateTime !== undefined && b.start.dateTime !== undefined)
		return new Date(a.start.dateTime) - new Date(b.start.dateTime);
	else if (a.start.dateTime !== undefined && b.start.dateTime === undefined)
		return new Date(a.start.dateTime) - new Date(b.start.date);
	else if (a.start.dateTime === undefined && b.start.dateTime !== undefined)
		return new Date(a.start.date) - new Date(b.start.dateTime);
};

const toOnlyTime = (dateTimeString) =>
	new Date(dateTimeString).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});

//TODO: Make this into this format: Friday, 16 Sept 17:00 - 20:00

const toUpcomingDateTime = (dateTimeString) => {
	return new Date(dateTimeString).toLocaleDateString([], {
		weekday: "short",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

//TODO: Add so that if the event starts earlier than today we want to display the start differently
const isEventStartTodayOrEarlier = (e) => {
	return (
		(new Date(e.start.dateTime).getDate() <= new Date(Date.now()).getDate() &&
			new Date(e.start.dateTime).getMonth() <=
				new Date(Date.now()).getMonth()) ||
		(new Date(e.start.date).getDate() <= new Date(Date.now()).getDate() &&
			new Date(e.start.date).getMonth() <= new Date(Date.now()).getMonth())
	);
};

const isEventEndSameDay = (e) => {
	return (
		(new Date(e.start.dateTime).getDate() ===
			new Date(e.end.dateTime).getDate() &&
			new Date(e.start.dateTime).getMonth() ===
				new Date(e.end.dateTime).getMonth()) ||
		(new Date(e.start.date).getDate() === new Date(e.end.date).getDate() &&
			new Date(e.start.date).getMonth() === new Date(e.end.date).getMonth())
	);
};

const createTodaysEvents = (evt) => {
	//TODO: Check if end is not today and make one for that too.
	let time;
	if (evt.start.dateTime !== undefined && evt.end.dateTime !== undefined) {
		if (isEventEndSameDay(evt)) {
			time = `${toOnlyTime(evt.start.dateTime)} - ${toOnlyTime(
				evt.end.dateTime
			)}`;
		} else {
			time = `${toOnlyTime(evt.start.dateTime)} - ${toUpcomingDateTime(
				evt.end.dateTime
			)}`;
		}
	} else if (
		evt.start.dateTime !== undefined &&
		evt.end.dateTime === undefined
	) {
		time = `${toOnlyTime(evt.start.dateTime)}`;
	} else if (evt.start.date !== undefined && evt.end.date === undefined) {
		time = `${toOnlyTime(evt.start.date)}`;
	} else if (evt.start.date !== undefined && evt.end.date !== undefined) {
		if (isEventEndSameDay(evt)) {
			time = `${toOnlyTime(evt.start.date)} - ${toOnlyTime(evt.end.date)}`;
		} else {
			time = `${toOnlyTime(evt.start.date)} - ${toUpcomingDateTime(
				evt.end.date
			)}`;
		}
	}
	let myEvent = { time: time, title: evt.summary };
	return myEvent;
};

const createUpcomingEvents = (evt) => {
	//TODO: Check if end.date is not today and make one for that too.
	let time;
	switch (true) {
		case evt.start.dateTime !== undefined && evt.end.dateTime !== undefined:
			if (isEventEndSameDay(evt)) {
				time = `${toUpcomingDateTime(evt.start.dateTime)} - ${toOnlyTime(
					evt.end.dateTime
				)}`;
			} else {
				time = `${toUpcomingDateTime(
					evt.start.dateTime
				)} - ${toUpcomingDateTime(evt.end.dateTime)}`;
			}
			break;
		case evt.start.dateTime !== undefined && evt.end.dateTime === undefined:
			time = `${toUpcomingDateTime(evt.start.dateTime)}`;
			break;
		case evt.start.date !== undefined && evt.end.date === undefined:
			time = `${toUpcomingDateTime(evt.start.date)}`;
			break;
		case evt.start.date !== undefined && evt.end.date !== undefined:
			if (isEventEndSameDay(evt)) {
				time = `${toUpcomingDateTime(evt.start.date)} - ${toOnlyTime(
					evt.end.date
				)}`;
			} else {
				time = `${toUpcomingDateTime(evt.start.date)} - ${toUpcomingDateTime(
					evt.end.date
				)}`;
			}
			break;
		default:
	}

	let myEvent = { time: time, title: evt.summary };
	return myEvent;
};
