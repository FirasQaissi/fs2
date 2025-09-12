import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import { productService } from '../services/productService';
import type { Product } from '../types/product';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Box>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Smart Lock Products
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Discover our latest collection of smart locks with advanced security features.
            </Typography>
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
                Our Products
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                  },
                  gap: 3,
                }}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </Box>
              {filteredProducts.length === 0 && !loading && (
                <Box textAlign="center" py={4}>
                  <Typography variant="h6" color="text.secondary">
                    {searchParams.get('search') 
                      ? `No products found for "${searchParams.get('search')}"`
                      : 'No products available at the moment.'
                    }
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}


