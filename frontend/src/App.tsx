import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/home/Home';
import Game from './pages/game/Game';
import Task from './pages/task/Task';
import History from './pages/history/History';
import LeaderBoard from './pages/leaderboard/LeaderBoard';
import Intro from './pages/intro/Intro';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/intro" element={<Intro />} />
                    <Route path="/game" element={<PrivateRoute><Game /></PrivateRoute>} />
                    <Route path="/leaderboard" element={<LeaderBoard />} />
                    <Route path="/task" element={<Task />} />
                    <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
