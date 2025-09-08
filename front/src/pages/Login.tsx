import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card>
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" fontWeight={700}>Sign in</Typography>
            <Typography color="text.secondary">Welcome back! Please enter your details.</Typography>
          </Box>
          <LoginForm onSuccess={() => navigate('/')} />
        </CardContent>
      </Card>
    </Container>
  );
}


