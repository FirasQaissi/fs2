import { Box, Card, CardContent, Container, Typography, Link } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Login() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <Navbar />
      
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Card
          sx={{
            borderRadius: '20px',
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
              color: 'white',
              p: 4,
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8 }}>
              Sign in to your Smart Lock Store account
            </Typography>
          </Box>
          
          <CardContent sx={{ p: 4 }}>
            <LoginForm onSuccess={() => navigate('/')} />
            
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/register"
                  sx={{
                    color: '#00d4aa',
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Sign up here
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}


