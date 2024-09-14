import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/Private';
import Gameboard from './components/Gameboard';
import NorseBoard from './components/Gameboards/Norse';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/gameboard" element={<Gameboard />} />
          <Route path="/gameboard/norse" element={<NorseBoard />} />
        </Route>
      </Routes>
    </Router>
  )
};

export default App;

