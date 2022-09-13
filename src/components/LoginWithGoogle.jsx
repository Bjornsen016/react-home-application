import { MenuItem } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { fetchDataFromApi } from "./utils/fetcher";

export default function LoginWithGoogle({
	setGoogleApiToken,
	setUser,
	closeMenu,
}) {
	const login = useGoogleLogin({
		scope:
			"https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/tasks",
		onSuccess: async (tokenResponse) => {
			console.log(tokenResponse);
			setGoogleApiToken(tokenResponse.access_token);
			const apiResponse = await fetchDataFromApi(
				"https://people.googleapis.com/v1/people/me?personFields=names,photos",
				tokenResponse.access_token
			);

			const theApiUser = {
				names: {
					displayName: apiResponse.names[0].displayName,
					givenName: apiResponse.names[0].givenName,
				},
				profilePicture: apiResponse.photos[0].url,
			};
			closeMenu();
			setTimeout(() => setUser(theApiUser), 1000);
		},
	});
	return <MenuItem onClick={login}>Sign in With Google</MenuItem>;
}
