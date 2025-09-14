import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthModal from '../components/auth/AuthModal';
import { productService } from '../services/productService';
import { useSettings } from '../providers/SettingsProvider';
import type { Product } from '../types/product';

export default function Products() {
  const { t } = useSettings();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await productService.getAllProducts();
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (err) {
        setError('Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.descriptions.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.features.some(feature => 
          feature.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchParams, products]);

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar onLoginClick={() => openAuthModal('login')} onRegisterClick={() => openAuthModal('register')} />

      {/* Hero Section */}
      <Box
        sx={{
          background: (theme) => theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          py: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <Typography 
              variant="h1" 
              sx={{ 
                mb: 3,
                background: (theme) => theme.palette.mode === 'dark'
                  ? 'linear-gradient(45deg, #00d4aa, #4de6c7)'
                  : 'linear-gradient(45deg, #00b894, #00d4aa)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              {t('products.title')}
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto',
                fontWeight: 400,
                lineHeight: 1.6
              }}
            >
              {t('products.subtitle')}
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

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
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 4,
                flexWrap: 'wrap',
                gap: 2
              }}>
                <Typography variant="h4" fontWeight={700}>
                  {t('products.count')} ({filteredProducts.length})
                </Typography>
                {searchParams.get('search') && (
                  <Box sx={{ 
                    px: 3, 
                    py: 1, 
                    bgcolor: 'primary.main',
                    color: 'white',
                    borderRadius: '25px',
                    fontSize: '0.875rem',
                    fontWeight: 500
                  }}>
                    Search: "{searchParams.get('search')}"
                  </Box>
                )}
              </Box>
              
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                  },
                  gap: { xs: 3, md: 4 },
                }}
              >
                {filteredProducts.map((product) => (
                  <Box
                    key={product.id}
                    sx={{
                      transform: 'translateZ(0)', // Enable hardware acceleration
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                      },
                    }}
                  >
                    <ProductCard product={product} />
                  </Box>
                ))}
              </Box>
              {filteredProducts.length === 0 && !loading && (
                <Box 
                  sx={{
                    textAlign: 'center',
                    py: 8,
                    px: 4,
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="h4" color="text.secondary" gutterBottom>
                    🔍
                  </Typography>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    {searchParams.get('search') 
                      ? `${t('products.noSearchResults')} "${searchParams.get('search')}"`
                      : t('products.noProducts')
                    }
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {searchParams.get('search')
                      ? 'Try adjusting your search terms or browse all products.'
                      : 'Check back soon for new products!'
                    }
                  </Typography>
                  {searchParams.get('search') && (
                    <Button
                      variant="outlined"
                      onClick={() => window.location.href = '/products'}
                      sx={{ mt: 2 }}
                    >
                      View All Products
                    </Button>
                  )}
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Container>

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
