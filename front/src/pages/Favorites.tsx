import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography,
  CircularProgress,
  Alert,
  Grid
} from '@mui/material';
import { 
  FavoriteOutlined as FavoriteIcon 
} from '@mui/icons-material';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import AuthModal from '../components/auth/AuthModal';
import { favoritesService } from '../services/favoritesService';
import { authStorage } from '../services/authStorage';
import type { Product } from '../types/product';

export default function Favorites() {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  
  const isAuthenticated = authStorage.isAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const { favorites } = await favoritesService.getFavorites();
        setFavorites(favorites);
      } catch (err) {
        setError('Failed to load favorites');
        console.error('Error fetching favorites:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [isAuthenticated]);

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar onLoginClick={() => openAuthModal('login')} onRegisterClick={() => openAuthModal('register')} />
        
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center'
          }}>
            <FavoriteIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Login Required
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Please login to view your favorite products.
            </Typography>
          </Box>
        </Container>

        <AuthModal 
          open={authModalOpen}
          onClose={closeAuthModal}
          initialMode={authModalMode}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar onLoginClick={() => openAuthModal('login')} onRegisterClick={() => openAuthModal('register')} />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FavoriteIcon sx={{ fontSize: 40, color: 'error.main' }} />
            <Box>
              <Typography variant="h3" fontWeight={700} gutterBottom>
                My Favorites
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Your collection of favorite smart lock products.
              </Typography>
            </Box>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress />
            </Box>
          ) : (
            <Box>
              <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
                Favorite Products ({favorites.length})
              </Typography>
              
              {favorites.length === 0 ? (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  minHeight: '40vh',
                  textAlign: 'center'
                }}>
                  <FavoriteIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    No Favorites Yet
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Start browsing products and add them to your favorites by clicking the heart icon.
                  </Typography>
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {favorites.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          )}
        </Box>
      </Container>

      {/* Auth Modal */}
      <AuthModal 
        open={authModalOpen}
        onClose={closeAuthModal}
        initialMode={authModalMode}
      />
    </Box>
  );
}
