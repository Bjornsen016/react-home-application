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
	const [todaysEvents, setTodaysEvents] = useState([]);
	const [upcomingEvents, setUpcomingEvents] = useState([]);

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

			const isEventToday = (e) => {
				return (
					(new Date(e.start.dateTime).getDate() ===
						new Date(Date.now()).getDate() &&
						new Date(e.start.dateTime).getMonth() ===
							new Date(Date.now()).getMonth()) ||
					(new Date(e.start.date).getDate() ===
						new Date(Date.now()).getDate() &&
						new Date(e.start.date).getMonth() ===
							new Date(Date.now()).getMonth())
				);
			};

			let todaysEvents = allEvents.filter((e) => isEventToday(e));
			console.log(new Date("2022-09-23T08:00:00+01:00").getDate());
			console.log(todaysEvents);
			console.log(allEvents);

			let upcomingEvents = allEvents.filter((e) => !isEventToday(e));

			//TODO: Check for end date. If in future need to make something different
			todaysEvents = todaysEvents.map((evt) => {
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
				} else if (evt.start.date !== undefined && evt.end.date === undefined) {
					time = `${toOnlyTime(evt.start.date)}`;
				}
				let myEvent = { time: time, title: evt.summary };
				return myEvent;
			});

			//TODO: Make this into this format: Friday, 16 Sept 17:00 - 20:00

			const toUpcomingDateTime = (dateTimeString) => {
				return new Date(dateTimeString).toLocaleDateString([], {
					weekday: "short",
					month: "short",
					day: "numeric",
				});
			};

			upcomingEvents = upcomingEvents.map((evt) => {
				let time;
				if (
					evt.start.dateTime !== undefined &&
					evt.end.dateTime !== undefined
				) {
					time = `${toUpcomingDateTime(
						evt.start.dateTime
					)} - ${toUpcomingDateTime(evt.end.dateTime)}`;
				} else if (
					evt.start.dateTime !== undefined &&
					evt.end.dateTime === undefined
				) {
					time = `${toUpcomingDateTime(evt.start.dateTime)}`;
				} else if (evt.start.date !== undefined && evt.end.date === undefined) {
					time = `${toUpcomingDateTime(evt.start.date)}`;
				}
				let myEvent = { time: time, title: evt.summary };
				return myEvent;
			});

			console.log(
				"Sorted today events",
				todaysEvents.map((e) => {
					return `${e.time}: ${e.title}`;
				})
			);

			setTodaysEvents(todaysEvents);
			setUpcomingEvents(upcomingEvents);

			//Make an interval to update the state. every 10 min? 15, 30?
			//TODO: TIME TO REFACTOR
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
					{new Date(Date.now()).toLocaleDateString("en-GB", {
						weekday: "long",
						year: "numeric",
						month: "short",
						day: "numeric",
					})}
				</Typography>
				{
					//TODO: If no events today. Write something about it
				}
				{todaysEvents?.map((evt) => (
					<CalendarEvent event={evt} />
				))}
			</Box>
			<Box style={flexStyle}>
				{/* Upcoming box */}
				<Typography variant='h4' align='center' sx={{ marginBottom: "5px" }}>
					UPCOMING
				</Typography>
				{upcomingEvents?.map((evt) => (
					<CalendarEvent event={evt} />
				))}
				{/* <div>
					<Typography variant='h5' align='center'>
						Monday, 5 dec, 19:00 - 22:00: Koda, koda, koda!!
					</Typography>
					<Typography variant='body1' align='center'>
						What is happening
					</Typography>
				</div> */}
				{/* One event in this div */}
				{/* <div>
					<Typography variant='h5' align='center'>
						Heading for one event
					</Typography>
					<Typography variant='body1' align='center'>
						What is happening
					</Typography>
				</div> */}
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
