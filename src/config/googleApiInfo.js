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
	googleAuthLinkGen: async () => {
		const data = await fetch(
			`https://homehubserverhandler.bjornsen016.repl.co/authLink`,
			{
				method: "POST",
				header: { "Content-Type": "application/json" },
			}
		).then((res) => res.json());

		console.log("data: ", data);
		window.location.replace(data.authLink);
	},
	googleRenewAuthToken: async (refreshToken) => {
		const newBody = { refresh_token: refreshToken };

		const headers = new Headers({
			"Content-Type": "application/json;charset=utf-8",
		});
		const data = await fetch(
			`https://homehubserverhandler.bjornsen016.repl.co/getNewAccesToken`,
			{
				method: "POST",
				body: JSON.stringify(newBody),
				headers: headers,
			}
		).then((res) => res.json());

		return data.token;
	},
};
