import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { fetchDataFromApi } from "../utils/fetcher";
import { useEffect, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";

export default function LoginWithGoogle({ setGoogleApiToken, setUser }) {
	const [showDialog, setShowDialog] = useState(false);
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
			setTimeout(() => setUser(theApiUser), 1000);
		},
	});

	const handleYesSignIn = async () => {
		login();
		setShowDialog(false);
	};
	const handleDontSignIn = () => {
		setShowDialog(false);
	};

	useEffect(() => {
		setShowDialog(true);
	}, []);

	//TODO: Style the button good
	return (
		<>
			<Button
				startIcon={<GoogleIcon />}
				variant='contained'
				size='small'
				color='success'
				onClick={login}
			>
				Google Sign in
			</Button>
			<Dialog open={showDialog}>
				<DialogTitle>Do you want to sign in with google?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						It will give you a view of your calender events and your tasks.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDontSignIn} color='primary'>
						No thanks
					</Button>
					<Button onClick={handleYesSignIn} color='primary'>
						Yes, sign me in
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
