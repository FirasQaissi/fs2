import { Box, Container, Typography, Card, CardContent, CardMedia } from '@mui/material';
import Navbar from '../components/Navbar';

const features = [
  {
    title: "Advanced Security",
    description: "Military-grade encryption and biometric authentication for maximum protection.",
    image: "/src/images/AllegionShlageOmnia_SatinNickel_Front_DigitsOn_Final_02.png.thumb.1280.1280_394x.webp",
    icon: "🔒"
  },
  {
    title: "Smart Connectivity",
    description: "WiFi, Bluetooth, and Zigbee support for seamless integration with your smart home.",
    image: "/src/images/Hd43ab953807844cf9cabc6346c167e89V.avif",
    icon: "📱"
  },
  {
    title: "Voice Control",
    description: "Compatible with Alexa, Google Assistant, and Siri for hands-free operation.",
    image: "/src/images/images22.jpeg",
    icon: "🎤"
  },
  {
    title: "Mobile App",
    description: "Comprehensive mobile app for remote monitoring and control from anywhere.",
    image: "/src/images/imagesddwe.jpeg",
    icon: "📲"
  },
  {
    title: "Auto-Lock",
    description: "Intelligent auto-lock feature that secures your door when you leave.",
    image: "/src/images/s-l1200.jpg",
    icon: "⚡"
  },
  {
    title: "Guest Access",
    description: "Temporary access codes for guests with customizable time limits.",
    image: "/src/images/smart_lock_web1.jpg",
    icon: "👥"
  }
];

export default function Features() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <Navbar />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" fontWeight={700} gutterBottom sx={{ color: '#1a1a1a' }}>
            Smart Lock Features
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Discover the advanced features that make our smart locks the perfect choice for modern homes and businesses.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 4,
          }}
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={feature.image}
                alt={feature.title}
                sx={{
                  objectFit: 'cover',
                  backgroundColor: '#f5f5f5',
                }}
              />
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h4" sx={{ mr: 2 }}>
                    {feature.icon}
                  </Typography>
                  <Typography variant="h5" fontWeight={600} sx={{ color: '#1a1a1a' }}>
                    {feature.title}
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
