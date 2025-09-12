
import { Box, Container, Typography, Card, Avatar } from '@mui/material';
import Navbar from '../components/Navbar';

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "/src/images/AllegionShlageOmnia_SatinNickel_Front_DigitsOn_Final_02.png.thumb.1280.1280_394x.webp",
    description: "10+ years in smart home technology"
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: "/src/images/Hd43ab953807844cf9cabc6346c167e89V.avif",
    description: "Expert in IoT and security systems"
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Design",
    image: "/src/images/images22.jpeg",
    description: "Award-winning product designer"
  },
  {
    name: "David Kim",
    role: "Lead Engineer",
    image: "/src/images/imagesddwe.jpeg",
    description: "Specialist in smart lock hardware"
  }
];

const stats = [
  { number: "50K+", label: "Happy Customers" },
  { number: "100K+", label: "Locks Installed" },
  { number: "99.9%", label: "Uptime" },
  { number: "24/7", label: "Support" }
];

export default function About() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <Navbar />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" fontWeight={700} gutterBottom sx={{ color: '#1a1a1a' }}>
            About Smart Lock Store
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}>
            We're revolutionizing home security with cutting-edge smart lock technology. 
            Founded in 2020, we've helped thousands of families secure their homes with 
            intelligent, reliable, and user-friendly smart lock solutions.
          </Typography>
        </Box>

        {/* Stats Section */}
        <Box sx={{ mb: 8 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
              gap: 4,
            }}
          >
            {stats.map((stat, index) => (
              <Card
                key={index}
                sx={{
                  textAlign: 'center',
                  p: 3,
                  borderRadius: '16px',
                  backgroundColor: 'white',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography variant="h3" fontWeight={700} color="primary" gutterBottom>
                  {stat.number}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {stat.label}
                </Typography>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Mission Section */}
        <Box sx={{ mb: 8 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, 1fr)',
              },
              gap: 6,
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant="h3" fontWeight={700} gutterBottom sx={{ color: '#1a1a1a' }}>
                Our Mission
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                To make home security accessible, intelligent, and effortless for everyone. 
                We believe that advanced security shouldn't be complicated or expensive.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Our smart locks combine military-grade security with intuitive design, 
                ensuring your home is protected while maintaining the convenience you deserve.
              </Typography>
            </Box>
            <Box
              sx={{
                height: 300,
                borderRadius: '16px',
                backgroundImage: 'url(/src/images/smart_lock_web1.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </Box>
        </Box>

        {/* Team Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" fontWeight={700} textAlign="center" gutterBottom sx={{ color: '#1a1a1a', mb: 4 }}>
            Meet Our Team
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
              gap: 4,
            }}
          >
            {team.map((member) => (
                <Card
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    borderRadius: '16px',
                    backgroundColor: 'white',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Avatar
                    src={member.image}
                    sx={{
                      width: 100,
                      height: 100,
                      mx: 'auto',
                      mb: 2,
                      border: '4px solid #00d4aa',
                    }}
                  />
                  <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#1a1a1a' }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="primary" fontWeight={600} gutterBottom>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.description}
                  </Typography>
                </Card>
            ))}
          </Box>
        </Box>

        {/* Values Section */}
        <Box>
          <Typography variant="h3" fontWeight={700} textAlign="center" gutterBottom sx={{ color: '#1a1a1a', mb: 4 }}>
            Our Values
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(3, 1fr)',
              },
              gap: 4,
            }}
          >
            <Card
              sx={{
                p: 4,
                borderRadius: '16px',
                backgroundColor: 'white',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
              }}
            >
              <Typography variant="h4" sx={{ mb: 2 }}>🔒</Typography>
              <Typography variant="h5" fontWeight={600} gutterBottom sx={{ color: '#1a1a1a' }}>
                Security First
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We prioritize your safety with military-grade encryption and advanced security features.
              </Typography>
            </Card>
            <Card
              sx={{
                p: 4,
                borderRadius: '16px',
                backgroundColor: 'white',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
              }}
            >
              <Typography variant="h4" sx={{ mb: 2 }}>🎯</Typography>
              <Typography variant="h5" fontWeight={600} gutterBottom sx={{ color: '#1a1a1a' }}>
                Innovation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We continuously innovate to bring you the latest in smart lock technology.
              </Typography>
            </Card>
            <Card
              sx={{
                p: 4,
                borderRadius: '16px',
                backgroundColor: 'white',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
              }}
            >
              <Typography variant="h4" sx={{ mb: 2 }}>🤝</Typography>
              <Typography variant="h5" fontWeight={600} gutterBottom sx={{ color: '#1a1a1a' }}>
                Customer Care
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your satisfaction is our priority with 24/7 support and comprehensive warranties.
              </Typography>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
