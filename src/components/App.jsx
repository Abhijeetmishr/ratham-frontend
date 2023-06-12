import React, { useState } from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
    const [token, setToken] = useState('');

    // Function to set the token after successful login
    const handleLogin = (token) => {
        setToken(token);
    };
    return (
        <Router>
        <Routes>
          <Route
            path="/"
            element={<Login handleLogin={handleLogin} />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard token={token} />}
          />
        </Routes>
      </Router>
    );
}

export default App;
