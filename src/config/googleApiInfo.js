export const googleApiInfo = {
	clientId:
		"947980141023-cekloj0k4d0ba8m4dk4pakb5cqiqa7r6.apps.googleusercontent.com",
	googleCalendarListPathname: "/calendar/v3/users/me/calendarList",
	googleCalendarEventsPathname: (calendar) =>
		`/calendar/v3/calendars/${calendar}/events`,
	googleCalendarBaseUrl: "https://www.googleapis.com",
	googleGetUserInfoUrl:
		"https://people.googleapis.com/v1/people/me?personFields=names,photos",
	scopes:
		"https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/tasks",
};
