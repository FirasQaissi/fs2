
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Stack
} from '@mui/material';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{
          objectFit: 'cover',
          backgroundColor: '#f5f5f5',
        }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {product.name}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {product.descriptions}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="primary" fontWeight="bold">
            Version: {product.version}
          </Typography>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            Features:
          </Typography>
          <Stack direction="row" spacing={0.5} useFlexGap flexWrap="wrap">
            {product.features.map((feature, index) => (
              <Chip
                key={index}
                label={feature}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            ))}
          </Stack>
        </Box>
        
        <Box sx={{ mt: 'auto' }}>
          <Typography variant="h5" color="primary" fontWeight="bold">
            ${product.price}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
