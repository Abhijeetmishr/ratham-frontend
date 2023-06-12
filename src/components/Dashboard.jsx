import { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';

function Dashboard({ token }) {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/availableSessions', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setSessions(data);
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSessions();
  }, [token]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={2}>
        {sessions.map(session => (
          <Grid item key={session.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Session ID: {session.id}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Start Time: {session.startTime}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  End Time: {session.endTime}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Available: {session.available ? 'Yes' : 'No'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Booked By: {session.bookedBy || 'N/A'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
    
}

export default Dashboard;

