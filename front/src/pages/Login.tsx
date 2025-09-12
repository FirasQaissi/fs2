import { Box, Card, CardContent, Container, Typography, Link, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import LoginForm from '../components/auth/LoginForm';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import type { User } from '../types/auth';

export default function Login() {
  const navigate = useNavigate();

  function getRouteForUser(user: User) {
    if (user?.isAdmin) return '/admin';
    if (user?.isBusiness) return '/business';
    return '/';
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f0f2f6' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Card sx={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}>
          <Grid container>
            <Grid item xs={12} md={6}
              sx={{
                bgcolor: '#efeefe',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                p: { xs: 4, md: 6 },
                gap: 3,
                borderRight: { md: '1px solid #e8e8ef' },
              }}
            >
              <Typography variant="h3" fontWeight={800} sx={{ lineHeight: 1.2 }}>
                Stay Organized, Achieve More
                <br />
                With Taskly.
              </Typography>
              <Box component="img" src="/src/images/smart_lock_web1.jpg" alt="Illustration" sx={{ maxWidth: '420px', width: '100%', borderRadius: 2 }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: { xs: 4, md: 6 } }}>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <Button variant="contained" disableElevation sx={{ borderRadius: '10px', bgcolor: '#1a1a1a', '&:hover': { bgcolor: '#2d2d2d' } }}>Login</Button>
                  <Button component={RouterLink} to="/register" variant="outlined" sx={{ borderRadius: '10px' }}>Register</Button>
                </Box>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
                  Let's login to your account.
                </Typography>
                <LoginForm onSuccess={(u: User) => navigate(getRouteForUser(u))} />
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Don't have an account?{' '}
                    <Link component={RouterLink} to="/register" sx={{ color: '#6c63ff', fontWeight: 600 }}>Register</Link>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
}


