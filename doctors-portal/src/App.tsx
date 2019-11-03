import React from 'react';
import './App.scss';

import {
  BrowserRouter,
  Route} from 'react-router-dom';

  import Header from './components/Header';
  import Login from './components/Login';

export default function App() {

  return (
    <div>
      <Header />
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/DoctorsRequest" component={DoctorsRequest} />
          <Route exact path="/DoctorsScore" component={DoctorsScore} />
        </div>
      </BrowserRouter>
      <h1>footer</h1>
    </div>
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

