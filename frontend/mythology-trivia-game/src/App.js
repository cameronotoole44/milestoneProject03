import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import PrivateRoute from './components/Private';
import Gameboard from './components/Gameboard';
import NorseBoard from './components/Gameboards/Norse';
import IrishBoard from './components/Gameboards/Irish';
import GreekBoard from './components/Gameboards/Greek';
import EgyptianBoard from './components/Gameboards/Egyptian';
import JapaneseBoard from './components/Gameboards/Japanese';
import ChineseBoard from './components/Gameboards/Chinese';

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
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/gameboard" element={<Gameboard />} />
          <Route path="/gameboard/norse" element={<NorseBoard />} />
          <Route path="/gameboard/irish" element={<IrishBoard />} />
          <Route path="/gameboard/greek" element={<GreekBoard />} />
          <Route path="/gameboard/egyptian" element={<EgyptianBoard />} />
          <Route path="/gameboard/japanese" element={<JapaneseBoard />} />
          <Route path="/gameboard/chinese" element={<ChineseBoard />} />
        </Route>
      </Routes>
    </Router>
  )
};

export default App;

