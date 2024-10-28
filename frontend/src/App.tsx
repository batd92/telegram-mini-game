import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import TokenHandler from './components/TokenHandler';
import PrivateRoute from './components/PrivateRoute';

import TelegramLogin from './pages/TelegramLogin';
import GameTab from './pages/game/GameTab';
import Referral from './pages/Referral';
import Home from './pages/Home';
import Task from './pages/Task';
import UserHistory from './pages/History';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
            <TokenHandler></TokenHandler>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/login" element={<TelegramLogin />} />
                        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                        <Route path="/game" element={<PrivateRoute><GameTab /></PrivateRoute>} />
                        <Route path="/referral" element={<PrivateRoute><Referral /></PrivateRoute>} />
                        <Route path="/task" element={<PrivateRoute><Task /></PrivateRoute>} />
                        <Route path="/history" element={<PrivateRoute><UserHistory /></PrivateRoute>} />
                    </Routes>
                </Suspense>
            </Router>
        </AuthProvider>
    );
};

export default App;
