import { Box, Container, Typography, Card, CardContent, CardMedia } from '@mui/material';
import Navbar from '../components/Navbar';

const features = [
  {
    title: "אבטחה מתקדמת",
    description: "הצפנה ברמה צבאית ואימות ביומטרי להגנה מקסימלית.",
    image: "/src/images/AllegionShlageOmnia_SatinNickel_Front_DigitsOn_Final_02.png.thumb.1280.1280_394x.webp",
    icon: "🔒"
  },
  {
    title: "קישוריות חכמה",
    description: "תמיכה ב-WiFi, Bluetooth ו-Zigbee לשילוב חלק עם הבית החכם.",
    image: "/src/images/Hd43ab953807844cf9cabc6346c167e89V.avif",
    icon: "📱"
  },
  {
    title: "שליטה קולית",
    description: "תומך ב-Alexa, Google Assistant ו-Siri להפעלה ללא מגע.",
    image: "/src/images/images22.jpeg",
    icon: "🎤"
  },
  {
    title: "אפליקציה לנייד",
    description: "אפליקציה מקיפה לניטור ושליטה מרחוק מכל מקום.",
    image: "/src/images/imagesddwe.jpeg",
    icon: "📲"
  },
  {
    title: "נעילה אוטומטית",
    description: "נעילה חכמה שמאבטחת את הדלת אוטומטית כשאתם יוצאים.",
    image: "/src/images/s-l1200.jpg",
    icon: "⚡"
  },
  {
    title: "גישה לאורחים",
    description: "קודי גישה זמניים לאורחים עם מגבלות זמן מותאמות.",
    image: "/src/images/smart_lock_web1.jpg",
    icon: "👥"
  }
];

export default function Features() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar onLoginClick={() => {}} onRegisterClick={() => {}} />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" fontWeight={700} gutterBottom sx={{ color: 'text.primary' }}>
            תכונות המנעול החכם
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            גלו את התכונות המתקדמות שהופכות את המנעולים שלנו לבחירה המושלמת לבתים ולעסקים.
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
                  objectFit: 'contain',
                  backgroundColor: 'white',
                }}
              />
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h3" sx={{ mr: 2 }}>
                    {feature.icon}
                  </Typography>
                  <Typography variant="h5" fontWeight={600} sx={{ color: 'text.primary' }} fontSize={{ xs: '1.2rem', md: '1.4rem' }} fontFamily='"Inter", "Roboto", sans-serif' align='center'>
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
