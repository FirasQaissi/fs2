import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingBag as ShoppingBagIcon,
  Favorite as FavoriteIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  Home as HomeIcon,
  Inventory as ProductsIcon,
  Star as FeaturesIcon,
  Build as ServicesIcon,
  Info as AboutIcon,
  Login as LoginIcon,
  PersonAdd as SignUpIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { authStorage } from '../services/authStorage';

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isAuthenticated = authStorage.getToken();
  // Removed call to non-existent getUser method
  // const user = authStorage.getUser();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleSignOut = () => {
    authStorage.clear();
    handleUserMenuClose();
    navigate('/');
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Products', path: '/products', icon: <ProductsIcon /> },
    { label: 'Features', path: '/features', icon: <FeaturesIcon /> },
    { label: 'Services', path: '/services', icon: <ServicesIcon /> },
    { label: 'About Us', path: '/about', icon: <AboutIcon /> },
  ];

  const MobileMenu = () => (
    <Drawer
      anchor="left"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          backgroundColor: '#1a1a1a',
          color: 'white',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
          Smart Lock Store
        </Typography>
        
        {/* Search Bar */}
        <Box component="form" onSubmit={handleSearch} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '25px',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00d4aa',
                },
              },
              '& .MuiInputBase-input': {
                color: 'white',
                '&::placeholder': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" size="small" sx={{ color: 'white' }}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', mb: 2 }} />

        {/* Navigation Items */}
        <List>
          {navItems.map((item) => (
            <ListItem
              key={item.path}
              component={RouterLink}
              to={item.path}
              onClick={handleMobileMenuToggle}
              sx={{
                borderRadius: '8px',
                mb: 0.5,
                backgroundColor: location.pathname === item.path ? 'rgba(0, 212, 170, 0.2)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} sx={{ color: 'white' }} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', my: 2 }} />

        {/* User Actions */}
        {isAuthenticated ? (
          <List>
            <ListItem
              component={RouterLink}
              to="/mycard"
              onClick={handleMobileMenuToggle}
              sx={{
                borderRadius: '8px',
                mb: 0.5,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                <ShoppingBagIcon />
              </ListItemIcon>
              <ListItemText primary="My Card" sx={{ color: 'white' }} />
            </ListItem>
            <ListItem
              onClick={() => {
                handleSignOut();
                handleMobileMenuToggle();
              }}
              sx={{
                borderRadius: '8px',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" sx={{ color: 'white' }} />
            </ListItem>
          </List>
        ) : (
          <List>
            <ListItem
              component={RouterLink}
              to="/login"
              onClick={handleMobileMenuToggle}
              sx={{
                borderRadius: '8px',
                mb: 0.5,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" sx={{ color: 'white' }} />
            </ListItem>
            <ListItem
              component={RouterLink}
              to="/register"
              onClick={handleMobileMenuToggle}
              sx={{
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                <SignUpIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Up" sx={{ color: 'white' }} />
            </ListItem>
          </List>
        )}
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: '#1a1a1a',
          boxShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              letterSpacing: '-0.5px',
            }}
          >
            Smart Lock Store
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {/* Search Bar */}
              <Box component="form" onSubmit={handleSearch} sx={{ minWidth: 300 }}>
                <TextField
                  fullWidth
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '25px',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#00d4aa',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                      '&::placeholder': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton type="submit" size="small" sx={{ color: 'white' }}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Navigation Links */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                      backgroundColor: location.pathname === item.path ? 'rgba(0, 212, 170, 0.2)' : 'transparent',
                      borderRadius: '8px',
                      px: 2,
                      py: 1,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            </Box>
          )}

          {/* Right Side Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {!isMobile && (
              <>
                {/* My Card */}
                <IconButton
                  component={RouterLink}
                  to="/mycard"
                  sx={{ color: 'white' }}
                >
                  <Badge badgeContent={0} color="error">
                    <ShoppingBagIcon />
                  </Badge>
                </IconButton>

                {/* Favorites */}
                <IconButton sx={{ color: 'white' }}>
                  <FavoriteIcon />
                </IconButton>
              </>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <IconButton onClick={handleUserMenuOpen} sx={{ color: 'white' }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: '#00d4aa' }}>
                  {isAuthenticated && typeof isAuthenticated === 'object' && isAuthenticated !== null && (isAuthenticated as { name?: string }).name && typeof (isAuthenticated as { name?: string }).name === 'string'
                    ? ((isAuthenticated as { name: string }).name.charAt(0).toUpperCase())
                    : <PersonIcon />}
                </Avatar>
              </IconButton>
            ) : (
              !isMobile && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    component={RouterLink}
                    to="/login"
                    sx={{
                      color: 'white',
                      textTransform: 'none',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '20px',
                      px: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    sx={{
                      backgroundColor: '#00d4aa',
                      color: 'white',
                      textTransform: 'none',
                      borderRadius: '20px',
                      px: 2,
                      '&:hover': {
                        backgroundColor: '#00b894',
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              )
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton onClick={handleMobileMenuToggle} sx={{ color: 'white' }}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* User Menu Dropdown */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: '#2a2a2a',
            color: 'white',
            borderRadius: '12px',
            mt: 1,
          },
        }}
      >
        <MenuItem onClick={handleUserMenuClose} sx={{ color: 'white' }}>
          <PersonIcon sx={{ mr: 1 }} />
          Profile
        </MenuItem>
        <MenuItem onClick={handleUserMenuClose} sx={{ color: 'white' }}>
          <ShoppingBagIcon sx={{ mr: 1 }} />
          My Card
        </MenuItem>
        <MenuItem onClick={handleSignOut} sx={{ color: 'white' }}>
          <LogoutIcon sx={{ mr: 1 }} />
          Sign Out
        </MenuItem>
      </Menu>

      {/* Mobile Menu */}
      <MobileMenu />
    </>
  );
}
