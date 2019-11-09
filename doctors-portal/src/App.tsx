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
import Tests from './components/Tests';
import Scans from './components/Scans';
import Dashboard from './components/Dashboard';
import Appointments from './components/Appointments';
import HospitalBookings from './components/HospitalBookings';
import CallbackRequests from './components/CallbackRequests';
import OnlineConsultations from './components/OnlineConsultations';
import OnlineConsultaionDetails from './components/OnlineConsultationDetails';

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
          <Route exact path="/callbackrequests" component={CallbackRequests} />
          <Route exact path="/hospitalbookings" component={HospitalBookings} />
          <Route exact path="/onlineconsulations" component={OnlineConsultations} />
          <Route exact path="/Onlineconsultaiondetails" component={OnlineConsultaionDetails} />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}


