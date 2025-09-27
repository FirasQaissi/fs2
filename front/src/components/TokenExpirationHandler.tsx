import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip
} from '@mui/material';
import {
  ExitToApp as LogoutIcon,
  ShoppingBag as ContinueIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { authStorage } from '../services/authStorage';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';

interface TokenExpirationHandlerProps {
  children: React.ReactNode;
}

export default function TokenExpirationHandler({ children }: TokenExpirationHandlerProps) {
  const [showExpiredDialog, setShowExpiredDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Create a global error handler for token expiration
    const handleTokenExpiration = (event: CustomEvent) => {
      if (event.detail.status === 401 && authStorage.isAuthenticated()) {
        setShowExpiredDialog(true);
      }
    };

    // Listen for token expiration events
    window.addEventListener('tokenExpired', handleTokenExpiration as EventListener);

    return () => {
      window.removeEventListener('tokenExpired', handleTokenExpiration as EventListener);
    };
  }, []);

  const handleContinue = () => {
    setShowExpiredDialog(false);
    authStorage.clear();
    // Stay on current page but user will be logged out
  };

  const handleLogout = async () => {
    try {
      // Call logout API to update server-side status
      await authService.logout();
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API call failed:', error);
    }
    
    setShowExpiredDialog(false);
    authStorage.clear();
    navigate('/');
  };

  return (
    <>
      {children}
      
      <Dialog 
        open={showExpiredDialog}
        onClose={() => {}} // Prevent closing by clicking outside
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '20px',
            border: '2px solid',
            borderColor: 'warning.main',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)',
            backdropFilter: 'blur(10px)',
          }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'warning.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%, 100%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.05)' }
                }
              }}
            >
              <WarningIcon sx={{ fontSize: '2.5rem', color: 'white' }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
                Session Expired
              </Typography>
              <Chip 
                label="Authentication Required"
                color="warning"
                size="small"
                sx={{ fontWeight: 600 }}
              />
            </Box>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ textAlign: 'center', py: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2,
              fontWeight: 500,
              color: 'text.primary'
            }}
          >
            Your session has expired. Do you want to continue browsing or log out?
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              fontSize: '1rem',
              lineHeight: 1.6,
              maxWidth: '400px',
              mx: 'auto'
            }}
          >
            You can continue browsing as a guest or return to the login page to sign in again.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ 
          justifyContent: 'center', 
          gap: 2, 
          pb: 4,
          px: 4 
        }}>
          <Button
            onClick={handleContinue}
            variant="outlined"
            size="large"
            startIcon={<ContinueIcon />}
            sx={{
              minWidth: 140,
              borderRadius: '12px',
              py: 1.5,
              px: 3,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            Continue
          </Button>

          <Button
            onClick={handleLogout}
            variant="contained"
            size="large"
            startIcon={<LogoutIcon />}
            sx={{
              minWidth: 140,
              borderRadius: '12px',
              py: 1.5,
              px: 3,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              bgcolor: 'error.main',
              '&:hover': {
                bgcolor: 'error.dark',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
