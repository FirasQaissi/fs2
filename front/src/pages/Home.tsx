import { useState, useMemo } from 'react';
import { 
  Box, 
  Container, 
  Typography,
  Button,
  Card,
  CardContent,
  TextField
} from '@mui/material';
import { 
  Face as FaceIcon,
  Fingerprint as FingerprintIcon,
  PhoneIphone as PhoneIphoneIcon,
  Pin as PinIcon,
  CreditCard as CreditCardIcon,
  VpnKey as VpnKeyIcon,
  Security as SecurityIcon,
  CheckCircle as CheckCircleIcon,
  Send as SendIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { http, API_BASE } from '../services/http';
import Footer from '../components/Footer';
// Removed useSettings to avoid requiring provider when Home is rendered in isolation

import AuthModal from '../components/auth/AuthModal';

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [contactForm, setContactForm] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Validation logic similar to Register/Login forms
  const nameError = useMemo(() => {
    return contactForm.fullName.length === 0 ? '' : contactForm.fullName.trim().length < 2 ? 'הכנס שם מלא תקין' : '';
  }, [contactForm.fullName]);
  
  const emailError = useMemo(() => {
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return contactForm.email.length > 0 && !EMAIL_REGEX.test(contactForm.email) ? 'הכנס כתובת אימייל תקינה' : '';
  }, [contactForm.email]);
  
  const phoneError = useMemo(() => {
    const ISRAELI_PHONE_REGEX = /^05[0-9]{8}$/;
    return contactForm.phone.length > 0 && !ISRAELI_PHONE_REGEX.test(contactForm.phone)
      ? 'הכנס מספר טלפון ישראלי תקין (05XXXXXXXX)'
      : '';
  }, [contactForm.phone]);
  
  const isContactFormValid = useMemo(() => {
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const ISRAELI_PHONE_REGEX = /^05[0-9]{8}$/;
    return contactForm.fullName.trim().length >= 2 && 
           EMAIL_REGEX.test(contactForm.email) && 
           ISRAELI_PHONE_REGEX.test(contactForm.phone);
  }, [contactForm.fullName, contactForm.email, contactForm.phone]);

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactError(null);
    
    if (!isContactFormValid) {
      setContactError('אנא מלא את כל השדות בצורה תקינה');
      return;
    }
    
    try {
      const payload = {
        name: contactForm.fullName,
        email: contactForm.email,
        phone: contactForm.phone,
      };
      const res = await http<{ ok: boolean; lead: unknown }>(`${API_BASE}/api/leads`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('New lead saved:', res?.lead);
      setContactSubmitted(true);
      setTimeout(() => {
        setContactSubmitted(false);
        setContactForm({ fullName: '', email: '', phone: '' });
      }, 3000);
    } catch (err) {
      console.error('Failed to submit lead', err);
      setContactError('אירעה שגיאה בשמירת הפנייה. נסה שוב.');
    }
  };

const features = [
  {
    icon: <FaceIcon sx={{ fontSize: 48, color: '#00d4aa' }} />,
    title: (
      <>
        Face Recognition <br /> זיהוי פנים
      </>
    ),
    description: 'טכנולוגיה מתקדמת לזיהוי פנים מדויק ומהיר',
  },
  {
    icon: <FingerprintIcon sx={{ fontSize: 48, color: '#7c4dff' }} />,
    title: (
      <>
        Fingerprint <br /> טביעת אצבע
      </>
    ),
    description: 'חיישן טביעת אצבע חכם ואמין',
  },
  {
    icon: <PhoneIphoneIcon sx={{ fontSize: 48, color: '#667eea' }} />,
    title: (
      <>
        Mobile App <br /> אפליקציה לנייד
      </>
    ),
    description: 'שליטה מלאה דרך הטלפון החכם',
  },
  {
    icon: <PinIcon sx={{ fontSize: 48, color: '#ff6b6b' }} />,
    title: (
      <>
        Security Code <br /> קוד אבטחה
      </>
    ),
    description: 'קוד PIN אישי לכניסה מהירה',
  },
  {
    icon: <CreditCardIcon sx={{ fontSize: 48, color: '#4ecdc4' }} />,
    title: (
      <>
        IC Card <br /> כרטיס IC חכם
      </>
    ),
    description: 'כרטיס חכם לגישה נוחה',
  },
  {
    icon: <VpnKeyIcon sx={{ fontSize: 48, color: '#ffa726' }} />,
    title: (
      <>
        Emergency Key <br /> מפתח חירום
      </>
    ),
    description: 'מפתח פיזי לשעת חירום',
  },
  {
    icon: <PhoneIphoneIcon sx={{ fontSize: 48, color: '#e91e63' }} />,
    title: (
      <>
        Camera Full HD <br /> מצלמה באיכות HD
      </>
    ),
    description: 'תומך בשיחות וידאו חיות והתראות טלפון בזמן אמת',
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 48, color: '#4caf50' }} />,
    title: (
      <>
        4-Month Battery <br /> סוללה ל-4 חודשים
      </>
    ),
    description: 'סוללה איכותית ועמידה שטוענת פעם אחת ונמשכת מספר חודשים',
  },
];


  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar onLoginClick={() => openAuthModal('login')} onRegisterClick={() => openAuthModal('register')} />

      {/* 1️⃣ Hero Section */}
      <Box
        sx={{
          color: 'text.primary',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.0,
            backgroundColor: 'text.primary',
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            alignItems: 'center',
            gap: 6 
          }}>
            <Box sx={{ flex: 1, width: '100%' }}>
 <Typography 
  variant="h2" 
  fontWeight={900} 
  gutterBottom
  sx={{ 
    fontSize: { xs: '2.8rem', md: '4rem', lg: '4.5rem' },
    lineHeight: 1.3,
    mb: 4,
    background: 'linear-gradient(135deg, rgba(227, 231, 200, 0.9) 0%, rgb(200, 204, 176) 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    fontFamily: '"Inter", "Roboto", sans-serif',
    textShadow: '1px 4px 20px rgba(45, 46, 35, 0.16)',
    letterSpacing: '-0.02em'
  }}
>
  מנעול חכם שמשדרג את 
  הדלת ביוקרה ובטכנולוגיה
</Typography>


              <Typography 
                 variant="h5" 
                sx={{ 
                  mb: 6, 
                  opacity: 0.95,
                  fontWeight: 200,
                  lineHeight: 1.7,
                  textAlign: 'center',
                  fontSize: { xs: '1.2rem', md: '1.7rem' },
                  fontFamily: '"Inter", "Roboto", sans-serif',
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  maxWidth: '600px',
                  mx: 'auto'
                }}
              >
                הדור הבא של אבטחה, עיצוב וחדשנות לנעילה קלה, בטוחה ומתקדמת מכל מקום בעולם.
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                gap: 3, 
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/about')}
                  sx={{
                    borderColor: '#00d4aa',
                    color: '#00d4aa',
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderWidth: 2,
                    '&:hover': {
                      bgcolor: 'rgba(0, 212, 170, 0.1)',
                      borderColor: '#00d4aa',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  למידע נוסף
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/products')}
                  sx={{
                    background: 'linear-gradient(135deg,rgb(12, 220, 89) 0%,rgb(34, 181, 44) 100%)',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    border: '2px solid rgba(63, 62, 62, 0.56)',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    boxShadow: '0 8px 32px rgba(0, 212, 170, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #00b894 0%, #6b46c1 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(0, 212, 170, 0.4)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  הזמן עכשיו
                </Button>
              </Box>
            </Box>
            <Box sx={{ flex: 1, width: '100%' }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                position: 'relative'
              }}>
                <Box
                  component="img"
                  src="/src/images/93098556593.png"
                  alt="Smart Lock"
                  sx={{
                    width: '100%',
                    maxWidth: 800,
                    height: 'auto',
                    borderRadius: '24px',
                    border: '3px solid rgba(31, 42, 1, 0.54)',
                    boxShadow: '0 25px 80px rgba(62, 61, 80, 0.85)',
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      border: '3px solid rgba(24, 116, 24, 0.55)',
                      boxShadow: '0 35px 100px rgba(12, 240, 8, 0.25)',
                    },
                    filter: 'drop-shadow(0 10px 30px rgba(183, 212, 206, 0.42))',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Elegant Separator */}
      <Box sx={{ 
        height: '2px',
        background: (theme) => theme.palette.mode === 'dark' 
          ? 'linear-gradient(90deg, transparent 0%, rgba(40, 45, 44, 0.3) 50%, transparent 100%)'
          : 'linear-gradient(90deg, transparent 0%, rgba(108, 99, 255, 0.3) 50%, transparent 100%)',
        mx: 'auto',
        maxWidth: '300px'
      }} />

      {/* 2️⃣ Product Marketing Explanation */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography 
            variant="h2" 
            fontWeight={800} 
            gutterBottom 
            sx={{ 
              color: 'text.primary',
              mb: 4,
              textAlign: 'center',
              fontSize: { xs: '2.2rem', md: '3rem' },
              fontFamily: '"Inter", "Roboto", sans-serif',
              letterSpacing: '-0.01em'
            }}
          >
            הכירו את הדור הבא של פתרונות הנעילה
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'text.secondary', 
              maxWidth: 700, 
              mx: 'auto',
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              lineHeight: 1.8,
              textAlign: 'center',
              fontWeight: 400,
              fontFamily: '"Inter", "Roboto", sans-serif'
            }}
          >
            המנעול החכם שלנו משלב אבטחה מתקדמת, נוחות בלתי מתפשרת ועיצוב יוקרתי.
            שלבו אותו בבית, במשרד או בדירה להשכרה – ותיהנו מטכנולוגיה שמאפשרת גישה בטוחה, מהירה ואלגנטית.
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: 'repeat(2, 1fr)', 
            md: 'repeat(4, 1fr)' 
          },
          gap: 4 
        }}>
          {features.map((feature, index) => (
            <Box key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 4,
                  borderRadius: '24px',
                  border: (theme) => theme.palette.mode === 'dark' 
                    ? '1px solid rgba(255,255,255,0.1)' 
                    : '1px solid rgba(108, 99, 255, 0.1)',
                  background: (theme) => theme.palette.mode === 'dark' 
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, rgba(108, 99, 255, 0.02) 100%)',
                  boxShadow: (theme) => theme.palette.mode === 'dark'
                    ? '0 10px 40px rgba(0, 0, 0, 0.3)'
                    : '0 10px 40px rgba(108, 99, 255, 0.08)',
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: (theme) => theme.palette.mode === 'dark'
                      ? '0 25px 60px rgba(0, 212, 170, 0.25)'
                      : '0 25px 60px rgba(108, 99, 255, 0.2)',
                    border: (theme) => theme.palette.mode === 'dark'
                      ? '1px solid rgba(0, 212, 170, 0.3)'
                      : '1px solid rgba(108, 99, 255, 0.3)',
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ 
                      p: 2, 
                      borderRadius: '50%',
                      background: (theme) => theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(0, 212, 170, 0.1) 0%, rgba(124, 77, 255, 0.1) 100%)'
                        : 'linear-gradient(135deg, rgba(108, 99, 255, 0.1) 0%, rgba(0, 212, 170, 0.1) 100%)',
                      transition: 'all 0.3s ease'
                    }}>
                      {feature.icon}
                    </Box>
                  </Box>
                  <Typography 
                    variant="h5" 
                    fontWeight={700} 
                    gutterBottom 
                    sx={{ 
                      color: 'text.primary',
                      textAlign: 'center',
                      fontSize: { xs: '1.3rem', md: '1.5rem' },
                      fontFamily: '"Inter", "Roboto", sans-serif',
                      mb: 2
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'text.secondary', 
                      lineHeight: 1.7,
                      textAlign: 'center',
                      fontSize: '1.1rem',
                      fontWeight: 400
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Elegant Separator */}
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}>
        <Box sx={{ 
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: (theme) => theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(0, 212, 170, 0.2) 0%, rgba(124, 77, 255, 0.2) 100%)'
            : 'linear-gradient(135deg, rgba(108, 99, 255, 0.2) 0%, rgba(0, 212, 170, 0.2) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'rotate 10s linear infinite',
          '@keyframes rotate': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' }
          }
        }}>
          <SecurityIcon sx={{ 
            fontSize: '28px',
            color: (theme) => theme.palette.mode === 'dark' ? '#00d4aa' : '#6c63ff'
          }} />
        </Box>
      </Box>

      {/* 3️⃣ Advanced Biometric Security */}
      <Box sx={{ 
        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'background.paper' : '#f8f9fc',
        py: 12,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <Box sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: '2px solid rgba(0, 212, 170, 0.3)',
          animation: 'pulse 3s infinite',
          '@keyframes pulse': {
            '0%, 100%': { transform: 'scale(1)', opacity: 0.7 },
            '50%': { transform: 'scale(1.2)', opacity: 0.3 }
          }
        }} />
        <Box sx={{
          position: 'absolute',
          top: '70%',
          right: '8%',
          width: '40px',
          height: '40px',
          borderRadius: '4px',
          border: '2px solid rgba(124, 77, 255, 0.3)',
          animation: 'float 4s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-20px) rotate(180deg)' }
          }
        }} />
        
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            alignItems: 'center',
            gap: 8 
          }}>
            <Box sx={{ flex: 1, width: '100%', position: 'relative' }}>
              <Box
                component="img"
                src="/src/images/661.jpg"
                alt="Advanced Biometric Technology"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '24px',
                  border: '2px solid rgba(0, 212, 170, 0.2)',
                  boxShadow: (theme) => theme.palette.mode === 'dark'
                    ? '0 25px 80px rgba(0, 212, 170, 0.3)'
                    : '0 25px 80px rgba(108, 99, 255, 0.15)',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    border: '2px solid rgba(0, 212, 170, 0.4)',
                  }
                }}
              />
              
              {/* Biometric Touch Overlays */}
              <Box sx={{
                position: 'absolute',
                top: '15%',
                left: '10%',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                bgcolor: 'rgba(0, 212, 170, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'ping 2s infinite',
                '@keyframes ping': {
                  '0%': { transform: 'scale(1)', opacity: 1 },
                  '75%, 100%': { transform: 'scale(2)', opacity: 0 }
                }
              }}>
                <FaceIcon sx={{ color: 'white', fontSize: '16px' }} />
              </Box>
              
              <Box sx={{
                position: 'absolute',
                bottom: '20%',
                right: '15%',
                width: '25px',
                height: '25px',
                borderRadius: '50%',
                bgcolor: 'rgba(124, 77, 255, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'ping 2.5s infinite 1s',
              }}>
                <FingerprintIcon sx={{ color: 'white', fontSize: '14px' }} />
              </Box>
              
              <Box sx={{
                position: 'absolute',
                top: '60%',
                left: '20%',
                animation: 'bounce 3s infinite 0.5s',
                '@keyframes bounce': {
                  '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                  '40%': { transform: 'translateY(-10px)' },
                  '60%': { transform: 'translateY(-5px)' }
                }
              }}>
                <Box sx={{
                  width: '20px',
                  height: '20px',
                  bgcolor: 'rgba(255, 107, 107, 0.8)',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Box sx={{
                    width: '8px',
                    height: '8px',
                    bgcolor: 'white',
                    borderRadius: '1px'
                  }} />
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ flex: 1, width: '100%' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="h2" 
                  fontWeight={800} 
                  gutterBottom 
                  sx={{ 
                    color: 'text.primary',
                    mb: 4,
                    fontSize: { xs: '2.2rem', md: '2.8rem' },
                    fontFamily: '"Inter", "Roboto", sans-serif',
                    letterSpacing: '-0.01em'
                  }}
                >
                  טכנולוגיה ביומטרית מתקדמת
                </Typography>
                
                <Box sx={{ mb: 6 }}>
                  {[
                    'חיישנים מתקדמים המזהים ניסיונות פריצה ומתריעים ישירות לטלפון',
                    'מפתח מכני לשעת חירום – גיבוי מלא',
                    'ניהול הרשאות זמניות או קבועות בלחיצת כפתור',
                    'מתאים לכל דלת, בכל בית',
                    'עינית דיגיטלית עם צג LCD מובנה במנעול',
                    'שילוב מושלם של חוכמה ונוחות',
                    'צפייה בזמן אמת על המתרחש בסביבת הדלת',
                    'שליטה מרחוק על נעילת הדלת מכל מקום'
                  ].map((text, index) => (
                    <Box key={index} sx={{ 
                      mb: 2,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 8,
                      justifyContent: 'flex-end',
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                      '@keyframes fadeInUp': {
                        'from': { opacity: 0, transform: 'translateY(20px)' },
                        'to': { opacity: 1, transform: 'translateY(0)' }
                      }
                    }}>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: 'text.primary',
                          fontSize: '1.15rem',
                          lineHeight: 1.7,
                          fontWeight: 700,
                          textAlign: 'right'
                        }}
                      >
                        {text}
                      </Typography>
                      <CheckCircleIcon sx={{ 
                        color: 'secondary.main', 
                        fontSize: '22px', 
                        mt: 0.2,
                        flexShrink: 0
                      }} />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Premium Separator */}
      <Box sx={{ 
        py: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3
      }}>
        <Box sx={{ 
          width: '80px',
          height: '2px',
          background: (theme) => theme.palette.mode === 'dark' 
            ? 'linear-gradient(90deg, transparent 0%, rgba(0, 212, 170, 0.4) 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(108, 99, 255, 0.4) 100%)'
        }} />
        <Box sx={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#00d4aa' : '#6c63ff',
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 1, transform: 'scale(1)' },
            '50%': { opacity: 0.7, transform: 'scale(1.2)' }
          }
        }} />
        <Box sx={{ 
          width: '80px',
          height: '2px',
          background: (theme) => theme.palette.mode === 'dark' 
            ? 'linear-gradient(90deg, rgba(0, 212, 170, 0.4) 0%, transparent 100%)'
            : 'linear-gradient(90deg, rgba(108, 99, 255, 0.4) 0%, transparent 100%)'
        }} />
      </Box>

      {/* 4️⃣ Contact Section */}
      <Box
        sx={{
          background: (theme) => theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)'
            : 'linear-gradient(135deg, #6c63ff 0%, #667eea 100%)',
          color: 'white',
          py: 12,
          position: 'relative'
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h2" 
              fontWeight={800} 
              gutterBottom
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3rem' },
                fontFamily: '"Inter", "Roboto", sans-serif',
                letterSpacing: '-0.01em',
                mb: 3
              }}
            >
                            השאר פרטים ונחזור אליך בהקדם

            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                opacity: 0.95,
                fontSize: { xs: '1.2rem', md: '1.4rem' },
                fontWeight: 400,
                fontFamily: '"Inter", "Roboto", sans-serif'
              }}
            >
              הנציגים שלנו נחמדים 
            </Typography>
          </Box>

          <Card
            sx={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
              backdropFilter: 'blur(30px)',
              border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: '28px',
              p: 6,
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)',
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            <Box component="form" onSubmit={handleContactSubmit}>
              {contactError && (
                <Box sx={{ 
                  mb: 3, 
                  p: 2, 
                  backgroundColor: 'rgba(255, 0, 0, 0.1)', 
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 0, 0, 0.3)',
                  textAlign: 'center'
                }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    {contactError}
                  </Typography>
                </Box>
              )}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: 4,
                alignItems: 'center'
              }}>
                <TextField
                  fullWidth
                  label="שם"
                  placeholder="הכנס את השם שלך"
                  value={contactForm.fullName}
                  onChange={(e) => setContactForm({...contactForm, fullName: e.target.value})}
                  error={!!nameError}
                  helperText={nameError}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      borderRadius: '16px',
                      height: '56px',
                      fontSize: '1.1rem',
                      '& fieldset': {
                        borderColor: nameError ? 'rgba(255, 0, 0, 0.6)' : 'rgba(255,255,255,0.4)',
                        borderWidth: '2px'
                      },
                      '&:hover fieldset': {
                        borderColor: nameError ? 'rgba(255, 0, 0, 0.8)' : 'rgba(255,255,255,0.6)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: nameError ? 'rgba(255, 0, 0, 0.8)' : 'rgba(255,255,255,0.8)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255,255,255,0.9)',
                      fontSize: '1.1rem',
                      fontWeight: 500
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                      textAlign: 'center',
                      fontSize: '1.1rem',
                      fontWeight: 500,
                      '&::placeholder': {
                        color: 'rgba(255,255,255,0.6)',
                        textAlign: 'center'
                      }
                    },
                    '& .MuiFormHelperText-root': {
                      color: 'rgba(255, 255, 255, 0.8)',
                      textAlign: 'center'
                    }
                  }}
                />
                
                <TextField
                  fullWidth
                  label="אימייל"
                  type="email"
                  placeholder="example@gmail.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  error={!!emailError}
                  helperText={emailError}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      borderRadius: '16px',
                      height: '56px',
                      fontSize: '1.1rem',
                      '& fieldset': {
                        borderColor: emailError ? 'rgba(255, 0, 0, 0.6)' : 'rgba(255,255,255,0.4)',
                        borderWidth: '2px'
                      },
                      '&:hover fieldset': {
                        borderColor: emailError ? 'rgba(255, 0, 0, 0.8)' : 'rgba(255,255,255,0.6)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: emailError ? 'rgba(255, 0, 0, 0.8)' : 'rgba(255,255,255,0.8)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255,255,255,0.9)',
                      fontSize: '1.1rem',
                      fontWeight: 500
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                      textAlign: 'center',
                      fontSize: '1.1rem',
                      fontWeight: 500,
                      '&::placeholder': {
                        color: 'rgba(255,255,255,0.6)',
                        textAlign: 'center'
                      }
                    },
                    '& .MuiFormHelperText-root': {
                      color: 'rgba(255, 255, 255, 0.8)',
                      textAlign: 'center'
                    }
                  }}
                />
                
                <TextField
                  fullWidth
                  label="טלפון"
                  placeholder="0501234567"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                  error={!!phoneError}
                  helperText={phoneError || 'פורמט: 05XXXXXXXX'}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      borderRadius: '16px',
                      height: '56px',
                      fontSize: '1.1rem',
                      '& fieldset': {
                        borderColor: phoneError ? 'rgba(255, 0, 0, 0.6)' : 'rgba(255,255,255,0.4)',
                        borderWidth: '2px'
                      },
                      '&:hover fieldset': {
                        borderColor: phoneError ? 'rgba(255, 0, 0, 0.8)' : 'rgba(255,255,255,0.6)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: phoneError ? 'rgba(255, 0, 0, 0.8)' : 'rgba(255,255,255,0.8)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255,255,255,0.9)',
                      fontSize: '1.1rem',
                      fontWeight: 500
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                      textAlign: 'center',
                      fontSize: '1.1rem',
                      fontWeight: 500,
                      '&::placeholder': {
                        color: 'rgba(255,255,255,0.6)',
                        textAlign: 'center'
                      }
                    },
                    '& .MuiFormHelperText-root': {
                      color: 'rgba(255, 255, 255, 0.8)',
                      textAlign: 'center'
                    }
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={contactSubmitted || !isContactFormValid}
                  endIcon={contactSubmitted ? <CheckCircleIcon /> : <SendIcon />}
                  sx={{
                    background: contactSubmitted 
                      ? 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)'
                      : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                    color: contactSubmitted ? 'white' : '#1a1a1a',
                    px: 8,
                    py: 2,
                    borderRadius: '20px',
                    textTransform: 'none',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    minWidth: 250,
                    height: '56px',
                    fontFamily: '"Inter", "Roboto", sans-serif',
                    boxShadow: '0 12px 40px rgba(255, 255, 255, 0.3)',
                    border: '2px solid rgba(255,255,255,0.4)',
                    '&:hover': {
                      background: contactSubmitted
                        ? 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)'
                        : 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 100%)',
                      transform: 'translateY(-3px) scale(1.02)',
                      boxShadow: '0 16px 50px rgba(255, 255, 255, 0.4)',
                      border: '2px solid rgba(255,255,255,0.6)',
                    },
                    '&:disabled': {
                      background: 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)',
                      color: 'white',
                      opacity: 0.9
                    },
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {contactSubmitted ? 'נשלח בהצלחה!' : 'שליחה'}
                </Button>
              </Box>
            </Box>
          </Card>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal 
        open={authModalOpen}
        onClose={closeAuthModal}
        initialMode={authModalMode}
      />
    </Box>
  );
}