import { createContext, useState, useMemo } from "react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Container,
  responsiveFontSizes,
} from "@mui/material";
import "./App.css";
import { TopBar, MainInfoScreen, Weather } from "./components";
import { Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { googleApiInfo } from "./config/googleApiInfo";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "",
});

const mainContainerStyle = {
  display: "grid",
  gridTemplateColumns: { xs: "repeat(1, 100%)", sm: "repeat(2, 50%)" }, //TODO: Change layout for landscape
  gridTemplateRows: { xs: "auto", sm: "66% 33%" },
  gridTemplateAreas: {
    sm: `"big-component big-component"
  "small-component-left small-component-right"
  `,
    xs: `"big-component"
  "small-component-left" 
  "small-component-right"
  `,
  },
  gridColumnGap: "10px",
  gridRowGap: "10px",
  height: { sm: "90vh", xs: "100%" },
  marginTop: "10px",
  marginBottom: "10px",
};

export const IsGridUnlockedContext = createContext({
  toggleUnlockGrid: () => {},
});

//TODO: Look into changing some of the useStates to useContexts

function App() {
  //Creates a way to unlock the grid.
  const [isGridUnlocked, setIsGridUnlocked] = useState(false);

  const gridUnlock = {
    toggleUnlockGrid: () => {
      setIsGridUnlocked((prev) => !prev);
    },
  };

  //Creates theme
  const [mode, setMode] = useState("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    []
  );

  const theme = useMemo(() => {
    let t = createTheme({
      palette: {
        mode,
      },
    });
    return responsiveFontSizes(t);
  }, [mode]);

  //user states
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [googleApiToken, setGoogleApiToken] = useState(
    JSON.parse(localStorage.getItem("googleApiToken"))
  );
  const [chosenCalendars, setChosenCalendars] = useState(
    JSON.parse(localStorage.getItem("chosenCalendars"))
  );

  return (
    <GoogleOAuthProvider clientId={googleApiInfo.clientId}>
      <ColorModeContext.Provider value={colorMode}>
        <IsGridUnlockedContext.Provider value={gridUnlock}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <TopBar
              colorMode={colorMode}
              user={user}
              setGoogleApiToken={setGoogleApiToken}
              setUser={setUser}
              setChosenCalendars={setChosenCalendars}
            />

            <Container sx={mainContainerStyle} maxWidth="lg">
              <Routes>
                <Route
                  path="/"
                  element={
                    <MainInfoScreen
                      user={user}
                      googleApiToken={googleApiToken}
                      chosenCalendars={chosenCalendars}
                      setChosenCalendars={setChosenCalendars}
                      isGridUnlocked={isGridUnlocked}
                    />
                  }
                />
                <Route path="/weather" element={<Weather colorMode={mode} />} />
                <Route
                  path="*"
                  element={<div>This route does not exist</div>}
                />
              </Routes>
            </Container>
          </ThemeProvider>
        </IsGridUnlockedContext.Provider>
      </ColorModeContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
