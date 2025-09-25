
import { Box, Container, Typography, Card, Avatar } from '@mui/material';
import Navbar from '../components/Navbar';

const team = [
  {
    name: "Sarah Johnson",
    role: "מנכ" + "ל ומייסדת",
    image: "/src/images/AllegionShlageOmnia_SatinNickel_Front_DigitsOn_Final_02.png.thumb.1280.1280_394x.webp",
    description: "מעל 10 שנים בתחום הבית החכם"
  },
  {
    name: "Michael Chen",
    role: "סמנכ" + "ל טכנולוגיות (CTO)",
    image: "/src/images/Hd43ab953807844cf9cabc6346c167e89V.avif",
    description: "מומחה ל-IoT ומערכות אבטחה"
  },
  {
    name: "Emily Rodriguez",
    role: "ראש תחום עיצוב",
    image: "/src/images/images22.jpeg",
    description: "מעצבת מוצר זוכת פרסים"
  },
  {
    name: "David Kim",
    role: "מהנדס מוביל",
    image: "/src/images/imagesddwe.jpeg",
    description: "מומחה לחומרת מנעולים חכמים"
  }
];

const stats = [
  { number: "50K+", label: "לקוחות מרוצים" },
  { number: "100K+", label: "מנעולים שהותקנו" },
  { number: "99.9%", label: "זמינות" },
  { number: "24/7", label: "תמיכה" }
];

export default function About() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar onLoginClick={() => {}} onRegisterClick={() => {}} />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" fontWeight={700} gutterBottom sx={{ color: 'text.primary' }}>
            אודות Smart Lock Store
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}>
            אנחנו מובילים את מהפכת האבטחה הביתית עם טכנולוגיית מנעולים חכמים מתקדמת.
            מאז 2020 סייענו לאלפי משפחות להגן על ביתן באמצעות פתרונות חכמים, אמינים ונוחים לשימוש.
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
              <Typography variant="h3" fontWeight={700} gutterBottom sx={{ color: 'text.primary' }}>
                המשימה שלנו
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                להפוך את אבטחת הבית לנגישה, חכמה ופשוטה עבור כולם. 
                אנו מאמינים שאבטחה מתקדמת לא חייבת להיות מסובכת או יקרה.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                המנעולים החכמים שלנו משלבים אבטחה ברמה צבאית עם ממשק אינטואיטיבי,
                כך שביתכם מוגן מבלי לוותר על הנוחות שמגיעה לכם.
              </Typography>
            </Box>
            <Box
              sx={{
                height: 300,
                borderRadius: '16px',
                backgroundImage: 'url(/src/images/Untitled-design-48-1.png)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            />
          </Box>
        </Box>

        {/* Team Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" fontWeight={700} textAlign="center" gutterBottom sx={{ color: 'text.primary', mb: 4 }}>
            הכירו את הצוות שלנו
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
                  <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: 'text.primary' }}>
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
          <Typography variant="h3" fontWeight={700} textAlign="center" gutterBottom sx={{ color: 'text.primary', mb: 4 }}>
            הערכים שלנו
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
              <Typography variant="h5" fontWeight={600} gutterBottom sx={{ color: 'text.primary' }}>
                אבטחה לפני הכל
              </Typography>
              <Typography variant="body2" color="text.secondary">
                אנו נותנים עדיפות לבטיחותכם באמצעות הצפנה ברמה צבאית ותכונות אבטחה מתקדמות.
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
              <Typography variant="h5" fontWeight={600} gutterBottom sx={{ color: 'text.primary' }}>
                חדשנות
              </Typography>
              <Typography variant="body2" color="text.secondary">
                אנו מחדשים ללא הרף כדי להביא לכם את המילה האחרונה בטכנולוגיית המנעולים החכמים.
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
              <Typography variant="h5" fontWeight={600} gutterBottom sx={{ color: 'text.primary' }}>
                שירות לקוחות
              </Typography>
              <Typography variant="body2" color="text.secondary">
                שביעות רצונכם קודמת לכל עם תמיכה 24/7 ואחריות מקיפה.
              </Typography>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
