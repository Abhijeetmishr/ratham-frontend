// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';

function Login({ handleLogin }) {
  const [universityId, setUniversityId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const performLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          universityId,
          password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        return token;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  
  // Usage:
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform login logic and obtain the token
      const token = await performLogin(); // Replace with your actual login logic

      if (token) {
        handleLogin(token); // Pass the token to the handleLogin function
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred');
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <TextField
          label="University ID"
          variant="outlined"
          value={universityId}
          onChange={(e) => setUniversityId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
      {error && (
        <Typography variant="body1" color="error" gutterBottom>
          Error: {error}
        </Typography>
      )}
    </Container>
  );
}

export default Login;
