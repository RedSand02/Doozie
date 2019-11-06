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
      <Header />
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function DoctorsRequest() {
  return <h2>DoctorsRequest</h2>;
}

function DoctorsScore() {
  return <h2>DoctorsScore</h2>;
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React here
//         </a>
//       </header>
//     </div>
//   );
// }

