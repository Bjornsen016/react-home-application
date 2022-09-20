export const busApiInfo = {
	busClientId: "jfSHkpiFsEKG8RgFzdfeGl3W97Ma",
	busClientSecret: "rqSiqnN_eQV2qHeHgzEtqo7ahVEa",
	getTokenUrl: "https://api.vasttrafik.se/token",
	generateDepInfoUrl: (busStopId, directionStopId) => {
		const now = new Date().toLocaleTimeString();
		const today = new Date().toLocaleDateString();
		const url = new URL("https://api.vasttrafik.se");
		url.pathname = "/bin/rest.exe/v2/departureBoard";
		url.searchParams.set("id", busStopId);
		url.searchParams.set("date", today);
		url.searchParams.set("time", now);
		url.searchParams.set("direction", directionStopId);
		url.searchParams.set("format", "json");

		return url;
	},
	generateSearchBusStopsUrl: (searchWords) => {
		const url = new URL("https://api.vasttrafik.se");
		url.pathname = "/bin/rest.exe/v2/location.name";
		url.searchParams.set("format", "json");
		url.searchParams.set("input", searchWords);
		return url;
	},
};
