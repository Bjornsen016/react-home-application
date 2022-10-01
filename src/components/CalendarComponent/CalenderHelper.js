//Helper functions
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

//Exported functions
export const sortDatesByEarliestFirst = (a, b) => {
	if (a.start.dateTime !== undefined && b.start.dateTime !== undefined)
		return new Date(a.start.dateTime) - new Date(b.start.dateTime);
	else if (a.start.dateTime !== undefined && b.start.dateTime === undefined)
		return new Date(a.start.dateTime) - new Date(b.start.date);
	else if (a.start.dateTime === undefined && b.start.dateTime !== undefined)
		return new Date(a.start.date) - new Date(b.start.dateTime);
};

//TODO: Add so that if the event starts earlier than today we want to display the start differently
//TODO: If recurrence exists we need to handle this differently.
export const isEventStartTodayOrEarlier = (e) => {
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

export const createTodaysEvents = (evt) => {
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

export const createUpcomingEvents = (evt) => {
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
