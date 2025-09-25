import React, { useState, useEffect } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Hide the loading screen after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <Box
      sx={{
        position: ' fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        animation: 'fadeOut 0.5s ease-in-out 2.5s forwards',
        '@keyframes fadeOut': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0, visibility: 'hidden' }
        }
      }}
    >
      <Box
        component="img"
        src="/src/images/sec (1).gif"
        alt="Loading..."
        sx={{
          width: isMobile ? '80%' : '400px',
          height: 'auto',
          maxWidth: '500px',
          maxHeight: '500px',
          objectFit: 'contain',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(237, 237, 237, 0.97)',
          animation: 'pulse 2s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': {
              transform: 'scale(1)',
              filter: 'brightness(1)'
            },
            '50%': {
              transform: 'scale(1.05)',
              filter: 'brightness(1.1)'
            }
          }
        }}
      />
    </Box>
  );
}
