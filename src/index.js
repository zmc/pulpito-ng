import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ReactQueryDevtools } from 'react-query/devtools'

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      notifyOnChangeProps: "tracked",
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
      queryFn: async ({queryKey}) => {
        return axios.get(
          queryKey[1].url,
        ).then(resp => resp.data)
      },
    },
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <App />
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
