import { Button } from "@mui/material";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import { fetchDataFromApi } from "./utils/fetcher";

export default function LoginWithGoogle({ setGoogleApiToken, setUser }) {
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
      setTimeout(() => {
        setUser(theApiUser);
      }, 2000);
    },
  });
  return <Button onClick={login}>Login With Google</Button>;
}
