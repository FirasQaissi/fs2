import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography,
  Button,
  Card,
  CardContent
} from '@mui/material';
import { 
  Security as SecurityIcon,
  Smartphone as SmartphoneIcon,
  Wifi as WifiIcon,
  Lock as LockIcon,
  Support as SupportIcon,
  Speed as SpeedIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useSettings } from '../providers/SettingsProvider';

import AuthModal from '../components/auth/AuthModal';

export default function Home() {
  const { t } = useSettings();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const navigate = useNavigate();

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const features = [
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: '#6c63ff' }} />,
      title: 'Advanced Security',
      description: 'Military-grade encryption and biometric authentication for maximum protection.'
    },
    {
      icon: <SmartphoneIcon sx={{ fontSize: 40, color: '#6c63ff' }} />,
      title: 'Smart Control',
      description: 'Control your locks remotely through our intuitive mobile app from anywhere.'
    },
    {
      icon: <WifiIcon sx={{ fontSize: 40, color: '#6c63ff' }} />,
      title: 'Wi-Fi Enabled',
      description: 'Seamless connectivity with your home network for real-time monitoring.'
    },
    {
      icon: <LockIcon sx={{ fontSize: 40, color: '#6c63ff' }} />,
      title: 'Keyless Entry',
      description: 'Multiple access methods including PIN codes, fingerprints, and mobile keys.'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: '#6c63ff' }} />,
      title: 'Fast Installation',
      description: 'Quick and easy installation process that works with most standard doors.'
    },
    {
      icon: <SupportIcon sx={{ fontSize: 40, color: '#6c63ff' }} />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support and technical assistance when you need it.'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <Navbar onLoginClick={() => openAuthModal('login')} onRegisterClick={() => openAuthModal('register')} />

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              {/* Logo */}
              <Box sx={{ mb: 4, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
           
              </Box>
              <Typography 
                variant="h2" 
                fontWeight={800} 
                gutterBottom
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2,
                  mb: 3
                }}
              >
                {t('home.headline')}
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4, 
                  opacity: 0.9,
                  fontWeight: 400,
                  lineHeight: 1.4
                }}
              >
                {t('home.sub')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/products')}
                  sx={{
                    bgcolor: 'white',
                    color: '#6c63ff',
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    boxShadow: '0 8px 32px rgba(255,255,255,0.2)',
                    '&:hover': {
                      bgcolor: '#f8f9fa',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(255,255,255,0.3)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {t('home.shop')}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/about')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderWidth: 2,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.1)',
                      borderColor: 'white',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {t('home.learn')}
                </Button>
              </Box>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box
                component="img"
                src="/src/images/1.jpg"
                alt="Smart Lock"
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  height: 'auto',
                  borderRadius: '20px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  transform: { md: 'rotate(2deg)' },
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: { md: 'rotate(0deg) scale(1.02)' }
                  }
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* About Us Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom sx={{ color: '#1a1a1a' }}>
            About Smart Gate
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Leading the revolution in smart home security with innovative, reliable, and user-friendly solutions.
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Box
              component="img"
              src="/src/images/2.jpg"
              alt="About Smart Gate"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '16px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" fontWeight={600} gutterBottom sx={{ color: '#1a1a1a' }}>
              Your Security, Our Priority
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#555' }}>
              At Smart Gate, we believe that everyone deserves to feel safe and secure in their own home. 
              That's why we've dedicated ourselves to creating the most advanced, reliable, and easy-to-use 
              smart lock systems on the market.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#555' }}>
              With over a decade of experience in security technology, our team of experts has developed 
              cutting-edge solutions that combine convenience with uncompromising security. From biometric 
              authentication to remote monitoring, we're constantly innovating to stay ahead of emerging threats.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#555' }}>
              Join thousands of satisfied customers who trust Smart Gate to protect what matters most to them.
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" fontWeight={700} gutterBottom sx={{ color: '#1a1a1a' }}>
              Why Choose Smart Gate?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Discover the features that make our smart locks the preferred choice for modern homes.
            </Typography>
          </Box>
          
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 4,
            }}
          >
            {features.map((feature, index) => (
              <Card
                key={index}
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  borderRadius: '16px',
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(108,99,255,0.15)',
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" fontWeight={600} gutterBottom sx={{ color: '#1a1a1a' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          color: 'white',
          py: 8,
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
            <Box sx={{ flex: 2 }}>
              <Typography variant="h3" fontWeight={700} gutterBottom>
                Ready to Secure Your Home?
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
                Join thousands of homeowners who trust Smart Gate for their security needs. 
                Get started today and experience the future of home protection.
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'row', md: 'column' } }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() => navigate('/products')}
                  sx={{
                    bgcolor: '#6c63ff',
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    boxShadow: '0 8px 32px rgba(108,99,255,0.3)',
                    '&:hover': {
                      bgcolor: '#5a52f0',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(108,99,255,0.4)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Shop Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  href="mailto:contact@smartgate.com"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderWidth: 2,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.1)',
                      borderColor: 'white',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Contact Us
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Auth Modal */}
      <AuthModal 
        open={authModalOpen}
        onClose={closeAuthModal}
        initialMode={authModalMode}
      />
    </Box>
  );
}


