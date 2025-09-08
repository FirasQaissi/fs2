import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import RegisterForm from '../components/auth/RegisterForm';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card>
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" fontWeight={700}>Create your account</Typography>
            <Typography color="text.secondary">Sign up to start tracking your learning.</Typography>
          </Box>
          <RegisterForm onSuccess={() => navigate('/')} />
        </CardContent>
      </Card>
    </Container>
  );
}


