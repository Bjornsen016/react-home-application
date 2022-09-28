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
import { googleApiInfo } from "../../config/googleApiInfo";
import { UserAuth } from "../contexts/UserAuthContext";
import { auth, db, loginWithCustomToken } from "../../firebase";

import { useLocation, useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";

const { scopes, googleGetUserInfoUrl, googleAuthLinkGen } = googleApiInfo;

//TODO: ATM the token will only live for 1 hour, I think this is because of the app being in testing mode on google api.
export default function LoginWithGoogle() {
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();
	const location = useLocation();

	const { googleApiToken } = UserAuth();

	/* const { user, googleApiToken } = UserAuth();
	const [showDialog, setShowDialog] = useState(false);
	const login = useGoogleLogin({
		scope: scopes,
		onSuccess: async (tokenResponse) => {
			localStorage.setItem(
				"googleApiToken",
				JSON.stringify(tokenResponse.access_token)
			);
			googleApiToken.set(tokenResponse.access_token);
			const apiResponse = await fetchDataFromApi(
				googleGetUserInfoUrl,
				tokenResponse.access_token
			);

			const theApiUser = {
				names: {
					displayName: apiResponse.names[0].displayName,
					givenName: apiResponse.names[0].givenName,
				},
				profilePicture: apiResponse.photos[0].url,
			};
			localStorage.setItem("user", JSON.stringify(theApiUser));
			setTimeout(() => {
				user.set(theApiUser);
			}, 1000);
		},
	}); */

	const loginWithFireBaseAndCustomServer = async () => {
		try {
			googleAuthLinkGen();
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		if (user) navigate("/");

		const getAccessFromQueries = async () => {
			const query = location.search?.split("?")[1];
			const idToken = query?.split("&")[0].split("=")[1];
			const acessToken = query?.split("&")[1].split("=")[1];
			const userId = query?.split("&")[2].split("=")[1];

			if (!query || !idToken || !acessToken || !userId) {
				return;
			}

			if (idToken) {
				await loginWithCustomToken(idToken).then(async () => {
					const userRef = ref(db, "user/" + userId);
					onValue(userRef, (snapshot) => {
						const dbUser = snapshot.val();
						console.log(snapshot.val(dbUser));
						//set the refresh token in session storage
						googleApiToken.set(acessToken);
						localStorage.setItem("googleApiToken", acessToken);
						localStorage.setItem("refreshToken", dbUser.refresh_token);
						const expirationDate = new Date(new Date().getTime() + 3600000);
						localStorage.setItem("expirationDate", expirationDate);
					});
				});
			}
		};

		getAccessFromQueries();
	}, [user, loading]);

	/* const handleYesSignIn = async () => {
		login();
		setShowDialog(false);
	};
	const handleDontSignIn = () => {
		setShowDialog(false);
	};

	//Shows the login dialog when the user is not logged in.
	useEffect(() => {
		setShowDialog(true);
	}, []); */

	//TODO: Style the button good
	return (
		<>
			<Button
				startIcon={<GoogleIcon />}
				variant='contained'
				size='small'
				color='success'
				onClick={loginWithFireBaseAndCustomServer}
				/* onClick={login} */
			>
				Google Sign in
			</Button>
			{/* <Dialog open={showDialog}>
				<DialogTitle>Do you want to sign in with Google?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						It will give you a view of your calendar events and your tasks.
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
			</Dialog> */}
		</>
	);
}
