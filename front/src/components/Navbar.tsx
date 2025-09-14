import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  Select,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography
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
  Logout as LogoutIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Translate as TranslateIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { authStorage } from '../services/authStorage';
import { useSettings } from '../providers/SettingsProvider';
import { cartService } from '../services/cartService';

interface NavbarProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

export default function Navbar({ onLoginClick, onRegisterClick }: NavbarProps = {}) {
  const { mode, setLanguage, toggleMode, lang } = useSettings();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  
  const isAuthenticated = authStorage.getToken();
  const user = authStorage.getUser<{ name?: string; isAdmin?: boolean; isBusiness?: boolean }>();

  // Update cart count on component mount and when storage changes
  useEffect(() => {
    const updateCartCount = () => setCartCount(cartService.getCartCount());
    updateCartCount();
    
    // Listen for storage changes to update cart count
    window.addEventListener('storage', updateCartCount);
    // Listen for custom cart update events
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

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
        '& .MuiDrawer-paper': (theme) => ({
          width: 280,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }),
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <Box component="img" src="/src/images/logo4.png" alt="Smart Gate" sx={{ height: 40, width: 'auto' }}  />  smartGate
        </Box>
        
        
        {/* Search Bar */}
        <Box component="form" onSubmit={handleSearch} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={(theme) => ({
              '& .MuiOutlinedInput-root': {
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                borderRadius: '25px',
                '& fieldset': { borderColor: 'transparent' },
                '&:hover fieldset': { borderColor: theme.palette.divider },
                '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
              },
              '& .MuiInputBase-input': {
                color: theme.palette.text.primary,
                '&::placeholder': { color: theme.palette.text.secondary },
              },
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" size="small" sx={{ color: 'inherit' }}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Divider sx={(theme) => ({ backgroundColor: theme.palette.divider, mb: 2 })} />

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
                backgroundColor: (theme) => location.pathname === item.path ? theme.palette.action.selected : 'transparent',
                '&:hover': (theme) => ({
                  backgroundColor: theme.palette.action.hover,
                }),
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} sx={{ color: 'inherit' }} />
            </ListItem>
          ))}
        </List>

        <Divider sx={(theme) => ({ backgroundColor: theme.palette.divider, my: 2 })} />

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
                '&:hover': (theme) => ({
                  backgroundColor: theme.palette.action.hover,
                }),
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                <ShoppingBagIcon />
              </ListItemIcon>
              <ListItemText primary="My Card" sx={{ color: 'inherit' }} />
            </ListItem>
            <ListItem
              onClick={() => {
                handleSignOut();
                handleMobileMenuToggle();
              }}
              sx={{
                borderRadius: '8px',
                cursor: 'pointer',
                '&:hover': (theme) => ({
                  backgroundColor: theme.palette.action.hover,
                }),
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" sx={{ color: 'inherit' }} />
            </ListItem>
          </List>
        ) : (
          <List>
            <ListItem
              onClick={() => {
                onLoginClick?.();
                handleMobileMenuToggle();
              }}
              sx={{
                borderRadius: '8px',
                mb: 0.5,
                cursor: 'pointer',
                '&:hover': (theme) => ({
                  backgroundColor: theme.palette.action.hover,
                }),
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" sx={{ color: 'inherit' }} />
            </ListItem>
            <ListItem
              onClick={() => {
                onRegisterClick?.();
                handleMobileMenuToggle();
              }}
              sx={{
                borderRadius: '8px',
                cursor: 'pointer',
                '&:hover': (theme) => ({
                  backgroundColor: theme.palette.action.hover,
                }),
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                <SignUpIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Up" sx={{ color: 'inherit' }} />
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
        sx={(theme) => ({ 
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)'
        })}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              gap: 1.5,
            }}
          >
            <Box component="img" src="/src/images/logo5.png" alt="Smart Gate" sx={{ height: 45, width: 'auto' }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #00d4aa, #00b894)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: '"Poppins", "Inter", "Roboto", sans-serif',
                letterSpacing: '0.5px',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              SmartGate
            </Typography>
          </Box>

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
                  sx={(theme) => ({
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                      borderRadius: '25px',
                      '& fieldset': { borderColor: 'transparent' }
                    },
                    '& .MuiInputBase-input': {
                      color: theme.palette.text.primary,
                      '&::placeholder': { color: theme.palette.text.secondary }
                    }
                  })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton type="submit" size="small" sx={{ color: 'inherit' }}>
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
                      color: 'inherit',
                      textTransform: 'none',
                      fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                      backgroundColor: 'transparent',
                      borderRadius: '8px',
                      px: 2,
                      py: 1,
                      '&:hover': {
                        backgroundColor: 'action.hover',
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
            {/* Language Switcher - dropdown */}
            <Box sx={(theme) => ({ display: 'flex', alignItems: 'center', gap: 1, mr: 1, border: `1px solid ${theme.palette.divider}`, borderRadius: '20px', px: 1 })}>
              <TranslateIcon fontSize="small" sx={{ color: 'inherit' }} />
              <Select
                size="small"
                value={lang}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'ar' | 'he')}
                variant="standard"
                disableUnderline
                sx={{ minWidth: 72, color: 'inherit' }}
              >
                <MenuItem value="en">EN</MenuItem>
                <MenuItem value="ar">AR</MenuItem>
                <MenuItem value="he">HE</MenuItem>
              </Select>
            </Box>

            {/* Theme Toggle - icon only */}
            <IconButton onClick={toggleMode} sx={{ color: 'inherit' }} aria-label="toggle theme">
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            {!isMobile && (
              <>
                {/* Admin Dashboard - only show for admin users */}
                {user?.isAdmin && (
                  <IconButton
                    component={RouterLink}
                    to="/admin"
                    sx={{ color: 'inherit' }}
                    title="Admin Dashboard"
                  >
                    <DashboardIcon />
                  </IconButton>
                )}

                {/* Shopping Cart */}
                <IconButton
                  component={RouterLink}
                  to="/cart"
                  sx={{ color: 'inherit' }}
                  title="Shopping Cart"
                >
                  <Badge badgeContent={cartCount} color="error">
                    <ShoppingBagIcon />
                  </Badge>
                </IconButton>

                {/* Favorites */}
                <IconButton
                  component={RouterLink}
                  to="/favorites"
                  sx={{ color: 'inherit' }}
                >
                  <FavoriteIcon />
                </IconButton>
              </>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <IconButton onClick={handleUserMenuOpen} sx={{ color: 'inherit' }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: '#00d4aa' }}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : <PersonIcon />}
                </Avatar>
              </IconButton>
            ) : (
              !isMobile && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    onClick={onLoginClick}
                    sx={{
                      color: 'inherit',
                      textTransform: 'none',
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                      borderRadius: '20px',
                      px: 2,
                      '&:hover': {
                        backgroundColor: 'action.hover',
                        borderColor: 'divider',
                      },
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    onClick={onRegisterClick}
                    variant="contained"
                    sx={{
                      backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#00b894' : '#00d4aa',
                      color: 'white',
                      textTransform: 'none',
                      borderRadius: '20px',
                      px: 2,
                      '&:hover': {
                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#00a884' : '#00b894',
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
              <IconButton onClick={handleMobileMenuToggle} sx={{ color: 'inherit' }}>
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
          '& .MuiPaper-root': (theme) => ({
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: '12px',
            mt: 1,
          }),
        }}
      >
        <MenuItem 
          component={RouterLink}
          to="/profile"
          onClick={handleUserMenuClose} 
          sx={{ color: 'inherit' }}
        >
          <PersonIcon sx={{ mr: 1 }} />
          Profile
        </MenuItem>
        <MenuItem onClick={handleUserMenuClose} sx={{ color: 'inherit' }}>
          <ShoppingBagIcon sx={{ mr: 1 }} />
          My Card
        </MenuItem>
        <MenuItem onClick={handleSignOut} sx={{ color: 'inherit' }}>
          <LogoutIcon sx={{ mr: 1 }} />
          Sign Out
        </MenuItem>
      </Menu>

      {/* Mobile Menu */}
      <MobileMenu />
    </>
  );
}
