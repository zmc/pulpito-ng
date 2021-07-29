import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ReactQueryDevtools } from "react-query/devtools";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      notifyOnChangeProps: "tracked",
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
      queryFn: async ({ queryKey }) => {
        return axios.get(queryKey[1].url).then((resp) => resp.data);
      },
    },
  },
});

function useDarkMode() {
  const systemDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [state, setState] = React.useState({ system: systemDarkMode });

  function setDarkMode(value) {
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
    const theme = createTheme({ palette: { type: paletteType } });
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
      <ThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <App darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </QueryClientProvider>
        </Router>
      </ThemeProvider>
    </React.StrictMode>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
