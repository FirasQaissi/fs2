
import { Box, Container, Typography, Card, CardContent, Button } from '@mui/material';
import Navbar from '../components/Navbar';

const services = [
  {
    title: "שירות התקנה",
    description: "התקנה מקצועית על ידי טכנאים מוסמכים עם כיסוי אחריות.",
    price: "החל מ־ 99₪",
    features: ["טכנאים מוסמכים", "כיסוי אחריות", "שירות באותו יום", "ייעוץ חינם"]
  },
  {
    title: "תחזוקה ותמיכה",
    description: "תחזוקה שוטפת ותמיכה טכנית 24/7 לכל צרכי המנעול החכם.",
    price: "החל מ־ 49₪ לחודש",
    features: ["תמיכה 24/7", "תחזוקה סדירה", "עדכוני תוכנה", "אבחון מרחוק"]
  },
  {
    title: "אינטגרציה לבית חכם",
    description: "הקמה מלאה של בית חכם ושילוב עם מערכות קיימות.",
    price: "החל מ־ 199₪",
    features: ["שילוב מערכות", "תצורה מותאמת אישית", "הדרכה", "תמיכה מתמשכת"]
  },
  {
    title: "ייעוץ אבטחה",
    description: "הערכת אבטחה מקצועית והמלצות לנכס שלך.",
    price: "החל מ־ 149₪",
    features: ["ביקורת אבטחה", "הערכת סיכונים", "פתרונות מותאמים", "תכנית יישום"]
  }
];

export default function Services() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar onLoginClick={() => {}} onRegisterClick={() => {}} />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" fontWeight={ 700} gutterBottom sx={{ color: 'text.primary' }}>
            השירותים שלנו
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            מגוון שירותים למנעולים חכמים כדי להבטיח אבטחה ושקט נפשי.
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
                  transform: 'translateY(-18px)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" fontWeight={600} gutterBottom sx={{ color: 'text.primary' }} fontSize={{ xs: '1.2rem', md: '1.4rem' }} fontFamily='"Inter", "Roboto", sans-serif' align='center'>
                  {service.title}
                </Typography>
                
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                  {service.description}
                </Typography>

                <Typography variant="h5" fontWeight={700} color="primary" sx={{ mb: 3 }}>
                  {service.price}
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: 'text.primary' }}>
                    מה כולל השירות:
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
                  התחל עכשיו
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
