import React from 'react';
import './App.scss';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  CssBaseline,
  createMuiTheme
} from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
  BrowserRouter,
  Route
} from 'react-router-dom';

import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import HospitalBookings from './components/HospitalBookings';
import OnlineConsultations from './components/OnlineConsultations';

export default function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header/>
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/tests" component={Tests} />
          <Route exact path="/scans" component={Scans} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/appointments" component={Appointments} />
          <Route exact path="/callbackrequests" component={CallBackRequests} />
          <Route exact path="/hospitalbookings" component={HospitalBookings} />
          <Route exact path="/onlineconsulations" component={OnlineConsultations} />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function Appointments() {
  return <h2>Appointments</h2>;
}

function CallBackRequests() {
  return <h2>CallBack Requests</h2>;
}

function Tests() {
  return <h2>Tests</h2>;
}

function Scans() {
  return <h2>Scans</h2>;
}

