import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactQueryDevtools } from "react-query/devtools";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider, StyledEngineProvider } from "@mui/material/styles";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import type { QueryKey } from "./lib/paddles.d";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      notifyOnChangeProps: "tracked",
      staleTime: 10000 * 60 * 60,
      cacheTime: 10000 * 60 * 60,
      queryFn: async (params) => {
        const queryKey = params.queryKey as QueryKey;
        return axios.get(queryKey[1].url).then((resp) => resp.data);
      },
    },
  },
});

type DarkModeState = {
  system: boolean;
  user?: boolean;
}

function useDarkMode(): [boolean, Function] {
  const systemDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [state, setState] = React.useState(
  { system: systemDarkMode } as DarkModeState
  );

  function setDarkMode(value: boolean) {
    const newState = { ...state, user: value };
    if (value !== state.user) {
      setState(newState);
    }
    setState(newState);
  }
  const darkMode = state.user === undefined ? systemDarkMode : state.user;
  return [darkMode, setDarkMode];
}

export default function Root() {
  const [darkMode, setDarkMode] = useDarkMode();
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const theme = React.useMemo(() => {
    const paletteType = darkMode ? "dark" : "light";
    const theme = createTheme({ palette: { mode: paletteType } });
    if (darkMode) {
      theme.palette.background.default = "#181818";
      theme.palette.background.paper = "#303030";
    }
    return theme;
  }, [darkMode]);
  if (darkMode === undefined) {
    return null;
  }
  return (
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Router>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false} />
              <App darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </QueryClientProvider>
          </Router>
        </ThemeProvider>
      </StyledEngineProvider>
    </React.StrictMode>
  );
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<Root />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
