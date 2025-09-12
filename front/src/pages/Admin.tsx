import { Box, Container, Typography } from '@mui/material';
import Navbar from '../components/Navbar';

export default function Admin() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <Navbar />
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight={800}>Admin Dashboard</Typography>
        <Typography sx={{ mt: 2 }}>
          Only administrators can access this page. Use the product endpoints to create, update, or delete products.
        </Typography>
      </Container>
    </Box>
  );
}

