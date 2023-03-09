import React, { useState } from 'react';
import Store from './components/Store/Store';
import { CssBaseline } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from './components/Home/Home';
import Analyse from './components/Analyse/Analyse';
import Plotter from './components/Plotter/Plotter';
import Ssh from './components/Ssh/Ssh';
import DataPage from './components/DataPage/DataPage';
import Assignments from './components/Assignments/Assignments';
import Login from './components/Login/Login';

function App() {

  // User authentication parameters.
  const [Auth, setAuth] = useState(
    window.sessionStorage.getItem("isAuthenticate")
  );
  const Authenticate = () => {
    setAuth(window.sessionStorage.getItem("isAuthenticate"));
  };

  return (
    <div>
      <CssBaseline />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home Auth={Auth} Authenticate={Authenticate} />} />
          <Route exact path="/collect" element={<Store Auth={Auth} Authenticate={Authenticate} />} />
          <Route exact path="/analyse" element={<Analyse Auth={Auth} Authenticate={Authenticate} />} />
          <Route exact path="/plot" element={<Plotter Auth={Auth} Authenticate={Authenticate} />} />
          <Route exact path="/ssh" element={<Ssh Auth={Auth} Authenticate={Authenticate} />} />
          <Route exact path="/datapage" element={<DataPage Auth={Auth} Authenticate={Authenticate} />} />
          <Route exact path="/assignments" element={<Assignments Auth={Auth} Authenticate={Authenticate} />} />
          <Route exact path="/login" element={
            Auth === "Yes" ?
              <Navigate to="/" replace={true} /> :
              <Login Auth={Auth} Authenticate={Authenticate} />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
