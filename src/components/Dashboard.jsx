import { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Container, Typography, Card, CardContent, Grid, CardActions, Button} from '@mui/material';

// Define custom styles using styled
const CustomCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#000000', // Set a background color
  borderRadius: theme.spacing(2), // Add some border radius
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
}));

const DeanIdTypography = styled(Typography)(({ theme }) => ({
  color: '#ff4081', // Change the text color
  fontWeight: 'bold', // Apply a bold font weight
}));


function Dashboard({ token }) {
  const [sessions, setSessions] = useState([]);
  const handleBooking = (sessionId) => {
    // Handle booking logic for the given session ID
    console.log(`Booking session ID: ${sessionId}`);
  };
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
            <CustomCard>
              <CardContent>
                <DeanIdTypography variant="h6" gutterBottom>
                  Dean ID: {session.deanId}
                </DeanIdTypography>
                <DeanIdTypography variant="body2" color="textSecondary">
                  Start Time: {session.startTime}
                </DeanIdTypography>
                <DeanIdTypography variant="body2" color="textSecondary">
                  End Time: {session.endTime}
                </DeanIdTypography>
                <DeanIdTypography variant="body2" color="textSecondary">
                  Available: {session.available ? 'Yes' : 'No'}
                </DeanIdTypography>
                <DeanIdTypography variant="body2" color="textSecondary">
                  Booked By: {session.bookedBy || 'N/A'}
                </DeanIdTypography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => handleBooking(session.id)}>
                  Book Now
                </Button>
              </CardActions>
            </CustomCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
    
}

export default Dashboard;

