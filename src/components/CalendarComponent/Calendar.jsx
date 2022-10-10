import { Container, CircularProgress } from "@mui/material";
import { EventsContainer } from "./EventsContainer";
import { CalenderListModal } from "./CalenderListModal";
import { useEffect, useState } from "react";
import { googleApiInfo } from "../../config/googleApiInfo";
import {
	sortDatesByEarliestFirst,
	isEventStartTodayOrEarlier,
	createTodaysEvents,
	createUpcomingEvents,
} from "./CalenderHelper";
import { UserAuth } from "../contexts/GoogleApiCallsContext";

const flexStyle = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-around",
};
const {
	googleCalendarBaseUrl,
	googleCalendarListPathname,
	googleCalendarEventsPathname,
} = googleApiInfo;

const Calendar = () => {
	const { apiToken, chosenCalendars, fetchDataFromApi } = UserAuth();

	const [showCalenderListModal, setShowCalenderListModal] = useState(false);
	const [calendarList, setCalendarList] = useState([]);
	const [todaysEvents, setTodaysEvents] = useState([]);
	const [upcomingEvents, setUpcomingEvents] = useState([]);
	const [loading, setLoading] = useState(true);

	const getCalendars = async () => {
		const url = new URL(googleCalendarBaseUrl);
		url.pathname = googleCalendarListPathname;
		const data = await fetchDataFromApi(url);
		return data.items;
	};

	const fetchEvents = async (calendars, maxAmountPerCalendar) => {
		const apiEvents = calendars.map(async (calendar) => {
			const url = new URL(googleCalendarBaseUrl);
			url.pathname = googleCalendarEventsPathname(calendar);

			const today = new Date(Date.now()).toISOString();
			url.searchParams.set("timeMin", today);
			url.searchParams.set("orderBy", "startTime");
			url.searchParams.set("maxResults", maxAmountPerCalendar);
			url.searchParams.set("singleEvents", true);

			const data = await fetchDataFromApi(url);
			return data.items;
		});
		return apiEvents;
	};

	const getEvents = async (calendars) => {
		if (calendars == undefined) {
			console.log("no calendars chosen");
			setLoading(false);
			return;
		}
		setLoading(true);
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
			setLoading(false);
		});
	};

	//TODO: How often should it automaticly update?
	useEffect(() => {
		let interval;

		if (apiToken.get === undefined || !localStorage.getItem("googleApiToken"))
			return;

		if (chosenCalendars.get?.length > 0) {
			getEvents(chosenCalendars.get);
			console.log("Setting up an interval for updating calendars");
			interval = setInterval(() => {
				getEvents(chosenCalendars.get);
				console.log("updating calendars");
			}, 1000 * 60 * 5);
		} else {
			getCalendars().then(async (items) => {
				setCalendarList(items);
				setShowCalenderListModal(true);
			});
		}

		return () => {
			clearInterval(interval);
		};
	}, [chosenCalendars.get, apiToken.get]);

	return (
		<Container style={{ height: "100%" }} sx={flexStyle} maxWidth='lg'>
			{loading ? (
				<CircularProgress />
			) : (
				<>
					<EventsContainer events={todaysEvents} upcoming={false} />
					<EventsContainer events={upcomingEvents} upcoming={true} />
				</>
			)}
			<CalenderListModal
				isOpen={showCalenderListModal}
				setIsOpen={setShowCalenderListModal}
				calendarList={calendarList}
			/>
		</Container>
	);
};

export default Calendar;
