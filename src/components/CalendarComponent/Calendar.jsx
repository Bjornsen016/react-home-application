import { Box, Container, Typography, CircularProgress } from "@mui/material";
import { CalendarEvent } from "./CalendarEvent";
import { EventsContainer } from "./EventsContainer";
import { CalenderListModal } from "./CalenderListModal";
import { fetchDataFromApi } from "../utils/fetcher";
import { useEffect, useState } from "react";
import { googleApiInfo } from "../../config/googleApiInfo";

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

const Calendar = ({ googleApiToken, chosenCalendars, setChosenCalendars }) => {
  const [showCalenderListModal, setShowCalenderListModal] = useState(false);
  const [calendarList, setCalendarList] = useState([]);
  const [todaysEvents, setTodaysEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCalendars = async () => {
    const url = new URL(googleCalendarBaseUrl);
    url.pathname = googleCalendarListPathname;
    const data = await fetchDataFromApi(url, googleApiToken);
    return data.items;
  };

  const fetchEvents = async (calendars, maxAmountPerCalendar) => {
    const apiEvents = calendars.map(async (calendar) => {
      const url = new URL(googleCalendarBaseUrl);
      url.pathname = googleCalendarEventsPathname(calendar);
      url.searchParams.set("maxResults", maxAmountPerCalendar);
      const today = new Date(Date.now()).toISOString();
      url.searchParams.set("timeMin", today);

      const data = await fetchDataFromApi(url, googleApiToken);
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
    if (chosenCalendars?.length > 0) {
      getEvents(chosenCalendars);
      console.log("Setting up an interval for updating calendars");
      interval = setInterval(() => {
        getEvents(chosenCalendars);
        console.log("updating calendars");
      }, 1000 * 60 * 5);
    } else {
      getCalendars().then(async (items) => {
        setCalendarList(items);
        setShowCalenderListModal(true);
        console.log("Opening the calendar list modal");
      });
    }

    return () => {
      console.log("Removing calendar interval");
      clearInterval(interval);
    };
  }, [chosenCalendars]);

  return (
    <Container style={{ height: "100%" }} sx={flexStyle} maxWidth="lg">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <EventsContainer events={todaysEvents} />
          <EventsContainer events={upcomingEvents} upcoming="UPCOMING" />
        </>
      )}
      <CalenderListModal
        isOpen={showCalenderListModal}
        setIsOpen={setShowCalenderListModal}
        calendarList={calendarList}
        setChosenCalendars={setChosenCalendars}
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
  new Date(dateTimeString).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

//TODO: Make this into this format: Friday, 16 Sept 17:00 - 20:00

const toUpcomingDateTime = (dateTimeString) => {
  return new Date(dateTimeString).toLocaleDateString("en-GB", {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

//TODO: Add so that if the event starts earlier than today we want to display the start differently
//TODO: Check the year also
const isEventStartTodayOrEarlier = (e) => {
  return (
    (new Date(e.start.dateTime).getDate() <= new Date(Date.now()).getDate() &&
      new Date(e.start.dateTime).getMonth() <=
        new Date(Date.now()).getMonth() &&
      new Date(e.start.dateTime).getFullYear() <=
        new Date(Date.now()).getFullYear()) ||
    (new Date(e.start.date).getDate() <= new Date(Date.now()).getDate() &&
      new Date(e.start.date).getMonth() <= new Date(Date.now()).getMonth() &&
      new Date(e.start.date).getFullYear() <=
        new Date(Date.now()).getFullYear())
  );
};

const isEventEndSameDay = (e) => {
  return (
    (new Date(e.start.dateTime).getDate() ===
      new Date(e.end.dateTime).getDate() &&
      new Date(e.start.dateTime).getMonth() ===
        new Date(e.end.dateTime).getMonth() &&
      new Date(e.start.dateTime).getFullYear() ===
        new Date(Date.now()).getFullYear()) ||
    (new Date(e.start.date).getDate() === new Date(e.end.date).getDate() &&
      new Date(e.start.date).getMonth() === new Date(e.end.date).getMonth() &&
      new Date(e.start.date).getFullYear() ===
        new Date(Date.now()).getFullYear())
  );
};

const createTodaysEvents = (evt) => {
  let time;
  if (evt.start.dateTime !== undefined && evt.end.dateTime !== undefined) {
    isEventEndSameDay(evt)
      ? (time = `${toOnlyTime(evt.start.dateTime)} - ${toOnlyTime(
          evt.end.dateTime
        )}`)
      : (time = `${toOnlyTime(evt.start.dateTime)} - ${toUpcomingDateTime(
          evt.end.dateTime
        )}`);
  } else if (
    evt.start.dateTime !== undefined &&
    evt.end.dateTime === undefined
  ) {
    time = `${toOnlyTime(evt.start.dateTime)}`;
  } else if (evt.start.date !== undefined && evt.end.date === undefined) {
    time = `${toOnlyTime(evt.start.date)}`;
  } else if (evt.start.date !== undefined && evt.end.date !== undefined) {
    isEventEndSameDay(evt)
      ? (time = `${toOnlyTime(evt.start.date)} - ${toOnlyTime(evt.end.date)}`)
      : (time = `${toOnlyTime(evt.start.date)} - ${toUpcomingDateTime(
          evt.end.date
        )}`);
  }
  let myEvent = { time: time, title: evt.summary, id: `today: ${evt.id}` };
  return myEvent;
};

const createUpcomingEvents = (evt) => {
  let time;
  switch (true) {
    case evt.start.dateTime !== undefined && evt.end.dateTime !== undefined:
      isEventEndSameDay(evt)
        ? (time = `${toUpcomingDateTime(evt.start.dateTime)} - ${toOnlyTime(
            evt.end.dateTime
          )}`)
        : (time = `${toUpcomingDateTime(
            evt.start.dateTime
          )} - ${toUpcomingDateTime(evt.end.dateTime)}`);
      break;
    case evt.start.dateTime !== undefined && evt.end.dateTime === undefined:
      time = `${toUpcomingDateTime(evt.start.dateTime)}`;
      break;
    case evt.start.date !== undefined && evt.end.date === undefined:
      time = `${toUpcomingDateTime(evt.start.date)}`;
      break;
    case evt.start.date !== undefined && evt.end.date !== undefined:
      isEventEndSameDay(evt)
        ? (time = `${toUpcomingDateTime(evt.start.date)} - ${toOnlyTime(
            evt.end.date
          )}`)
        : (time = `${toUpcomingDateTime(evt.start.date)} - ${toUpcomingDateTime(
            evt.end.date
          )}`);
      break;
    default:
  }

  let myEvent = { time: time, title: evt.summary, id: `upcoming: ${evt.id}` };
  return myEvent;
};
