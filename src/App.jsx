import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Access from './components/Access';
import Dashboard from './components/Dashboard';
import TaskManager from './components/TaskManager';
import Notepad from './components/Notepad';
import CalendarPage from './components/CalendarPage';
import Config from './components/Config';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            {/* Only show Navbar if user is authenticated */}
            {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}
            
            <Routes>
                {/* Only the Access component is available before logging in */}
                <Route 
                    path="/" 
                    element={<Access setIsAuthenticated={setIsAuthenticated} />} 
                />

                {/* Protected Routes */}
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/stories" 
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <TaskManager />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/community" 
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <Notepad />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/wallets" 
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <CalendarPage />
                        </ProtectedRoute>
                    } 
                />
               
                <Route 
                    path="/config" 
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <Config />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </Router>
    );
}

export default App;
