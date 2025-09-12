
import { Box, Container, Typography, Card, CardContent, Button } from '@mui/material';
import Navbar from '../components/Navbar';

const services = [
  {
    title: "Installation Service",
    description: "Professional installation by certified technicians with warranty coverage.",
    price: "From $99",
    features: ["Certified Technicians", "Warranty Coverage", "Same Day Service", "Free Consultation"]
  },
  {
    title: "Maintenance & Support",
    description: "Regular maintenance and 24/7 technical support for all your smart lock needs.",
    price: "From $49/month",
    features: ["24/7 Support", "Regular Maintenance", "Software Updates", "Remote Diagnostics"]
  },
  {
    title: "Smart Home Integration",
    description: "Complete smart home setup and integration with existing systems.",
    price: "From $199",
    features: ["System Integration", "Custom Configuration", "Training Session", "Ongoing Support"]
  },
  {
    title: "Security Consultation",
    description: "Expert security assessment and recommendations for your property.",
    price: "From $149",
    features: ["Security Audit", "Risk Assessment", "Custom Solutions", "Implementation Plan"]
  }
];

export default function Services() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <Navbar />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" fontWeight={700} gutterBottom sx={{ color: '#1a1a1a' }}>
            Our Services
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Comprehensive smart lock services to ensure your security and peace of mind.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
            },
            gap: 4,
          }}
        >
          {services.map((service, index) => (
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
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" fontWeight={600} gutterBottom sx={{ color: '#1a1a1a' }}>
                  {service.title}
                </Typography>
                
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                  {service.description}
                </Typography>

                <Typography variant="h5" fontWeight={700} color="primary" sx={{ mb: 3 }}>
                  {service.price}
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#1a1a1a' }}>
                    What's Included:
                  </Typography>
                  {service.features.map((feature, featureIndex) => (
                    <Box key={featureIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ color: '#00d4aa', mr: 1 }}>✓</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#00d4aa',
                    color: 'white',
                    borderRadius: '12px',
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: '#00b894',
                    },
                  }}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
