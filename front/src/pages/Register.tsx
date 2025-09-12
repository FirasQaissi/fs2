import { Box, Card, CardContent, Container, Typography, Link } from '@mui/material';
import RegisterForm from '../components/auth/RegisterForm';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Register() {
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
              background: 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)',
              color: 'white',
              p: 4,
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Join Smart Lock Store
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Create your account and start securing your home
            </Typography>
          </Box>
          
          <CardContent sx={{ p: 4 }}>
            <RegisterForm onSuccess={() => navigate('/')} />
            
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/login"
                  sx={{
                    color: '#00d4aa',
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Sign in here
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}


