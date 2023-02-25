import React, { useState } from 'react';
import Store from './components/Store/Store';
import { CssBaseline } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import Home from './components/Home/Home';
import Analyse from './components/Analyse/Analyse';
import Plotter from './components/Plotter/Plotter';
import Ssh from './components/Ssh/Ssh';
import DataPage from './components/DataPage/DataPage';
import Assignments from './components/Assignments/Assignments';

function App() {

  // Function to handle the CSV file upload
  

  return (
    <div>
      <CssBaseline />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/collect" element={<Store />} />
          <Route exact path="/analyse" element={<Analyse />} />
          <Route exact path="/plot" element={<Plotter />} />
          <Route exact path="/ssh" element={<Ssh />} />
          <Route exact path="/datapage" element={<DataPage />} />
          <Route exact path="/assignments" element={<Assignments />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
