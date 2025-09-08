import { useMemo } from 'react';
import { AppBar, Box, Button, Chip, Container, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

export default function Home() {
  const featuredTags = useMemo(() => ['javascript', 'react', 'node', 'mongodb'], []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: (t) => t.palette.background.default }}>
      <AppBar position="static" color="primary" enableColorOnDark>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Study Tracker
          </Typography>
          <Button color="inherit" component={RouterLink} to="/login">Login</Button>
          <Button color="inherit" variant="outlined" sx={{ ml: 1 }} component={RouterLink} to="/register">Sign Up</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Stack spacing={6}>
          <Box>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Build your learning journey
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Create modular paths, track progress, and learn at your own pace.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
              <Button variant="contained" size="large">Explore Paths</Button>
              <Button variant="outlined" size="large">Create Path</Button>
            </Stack>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Featured tags
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {featuredTags.map((tag) => (
                <Chip key={tag} label={tag} variant="outlined" clickable />
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              How it works
            </Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
              <Box sx={{ flex: 1, p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle1" fontWeight={700}>1. Create or enroll</Typography>
                <Typography color="text.secondary">Pick a learning path or design your own.</Typography>
              </Box>
              <Box sx={{ flex: 1, p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle1" fontWeight={700}>2. Complete modules</Typography>
                <Typography color="text.secondary">Watch videos, read articles, and take quizzes.</Typography>
              </Box>
              <Box sx={{ flex: 1, p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle1" fontWeight={700}>3. Track progress</Typography>
                <Typography color="text.secondary">Mark modules complete and visualize progress.</Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}


