import { Button } from "@mui/material";
import { useEffect } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { googleApiInfo } from "../../config/googleApiInfo";
import { auth, db, loginWithCustomToken } from "../../firebase";

import { useLocation, useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";

import { UserAuth } from "../contexts/GoogleApiCallsContext";

const { googleAuthLinkGen } = googleApiInfo;

export default function LoginWithGoogle() {
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();
	const location = useLocation();

	const { apiToken } = UserAuth();

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
						apiToken.set(acessToken);
						localStorage.setItem("googleApiToken", acessToken);
						localStorage.setItem("refreshToken", dbUser.refresh_token);
						const expirationDate = new Date(new Date().getTime() + 3600000);
						localStorage.setItem("expirationDate", expirationDate);
						navigate("/");
					});
				});
			}
		};

		getAccessFromQueries();
	}, [user, loading]);

	//TODO: Style the button good
	return (
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
	);
}
