import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Stack,
  Button,
  TextField,
  Chip,
  Divider,
  Snackbar,
  Alert,
  Card,
  CardContent,
} from '@mui/material';
import { 
  DataGrid, 
  GridActionsCellItem, 
  type GridColDef, 
  type GridRowParams
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import BusinessIcon from '@mui/icons-material/Business';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Navbar from '../components/Navbar';
import { adminService, type AdminUser } from '../services/adminService';
import { productService } from '../services/productService';
import type { Product, ProductCreateRequest } from '../types/product';

type TabKey = 'users' | 'products';

export default function Admin() {
  const [tab, setTab] = useState<TabKey>('users');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [snack, setSnack] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [newProduct, setNewProduct] = useState<ProductCreateRequest>({ name: '', descriptions: '', version: '', features: [], price: 0, image: '' });
  const [featuresInput, setFeaturesInput] = useState('');
  const [creatingProduct, setCreatingProduct] = useState(false);
  
  // New user creation state
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    isAdmin: false,
    isBusiness: false,
    isUser: true
  });
  const [creatingUser, setCreatingUser] = useState(false);

  useEffect(() => {
    setLoadingUsers(true);
    adminService
      .listUsers()
      .then(setUsers)
      .catch((e) => setSnack({ open: true, message: e.message || 'Failed to load users', severity: 'error' }))
      .finally(() => setLoadingUsers(false));
  }, []);

  useEffect(() => {
    setLoadingProducts(true);
    productService
      .getAllProducts()
      .then(setProducts)
      .catch((e) => setSnack({ open: true, message: e.message || 'Failed to load products', severity: 'error' }))
      .finally(() => setLoadingProducts(false));
  }, []);

  const userColumns: GridColDef[] = useMemo(() => [
      { 
        field: 'name', 
        headerName: 'Name', 
        flex: 1, 
        editable: true,
        renderCell: (params: { value?: string; id: string | number }) => {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" fontWeight={600}>
                {params.value}
              </Typography>
            </Box>
          );
        }
      },
      { 
        field: 'email', 
        headerName: 'Email', 
        flex: 1.2, 
        editable: true,
        renderCell: (params: { value?: string }) => {
          return (
            <Typography variant="body2" color="primary">
              {params.value}
            </Typography>
          );
        }
      },
      { 
        field: 'phone', 
        headerName: 'Phone', 
        flex: 0.8,
        editable: true,
        renderCell: (params: { value?: string }) => {
          return (
            <Typography variant="body2">
              {params.value || 'Not provided'}
            </Typography>
          );
        }
      },
      {
        field: 'createdAt',
        headerName: 'Registered At',
        flex: 1,
        renderCell: (params: { value?: string }) => {
          if (!params.value) return 'N/A';
          try {
            return new Date(params.value).toLocaleString();
          } catch {
            return 'Invalid Date';
          }
        },
      },
      {
        field: 'tempAdminExpiry',
        headerName: 'Temp Admin Expires',
        flex: 1,
        renderCell: (params: { value?: string }) => {
          if (!params.value) return 'N/A';
          try {
            const date = new Date(params.value);
            const now = new Date();
            if (date < now) {
              return <span style={{ color: 'red' }}>Expired</span>;
            }
            return date.toLocaleString();
          } catch {
            return 'Invalid Date';
          }
        },
      },
      {
        field: 'isAdmin',
        headerName: 'Admin',
        type: 'boolean',
        editable: true,
        width: 110,
      },
      {
        field: 'isBusiness',
        headerName: 'Business',
        type: 'boolean',
        editable: true,
        width: 120,
      },
      {
        field: 'isUser',
        headerName: 'User',
        type: 'boolean',
        editable: true,
        width: 110,
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        getActions: (params: GridRowParams) => {
          const id = String(params.id);
          const row = params.row as AdminUser;
                        return [
                          <GridActionsCellItem
                            key="edit"
                            icon={<EditIcon />}
                            label="Edit User Details"
                            onClick={() => {
                              setSnack({ open: true, message: 'Double-click any cell to edit user details', severity: 'info' });
                            }}
                            showInMenu
                          />,
                          <GridActionsCellItem
                            key="save"
                            icon={<SaveIcon />}
                            label="Save Changes"
                            onClick={async () => {
                              try {
                                const updated = await adminService.updateUser(id, {
                                  name: row.name,
                                  email: row.email,
                                  phone: row.phone,
                                  isAdmin: !!row.isAdmin,
                                  isBusiness: !!row.isBusiness,
                                  isUser: row.isUser !== false,
                                });
                                setUsers((list) => list.map((u) => (u._id === id ? updated : u)));
                                setSnack({ open: true, message: 'User updated successfully!', severity: 'success' });
                              } catch (e: unknown) {
                                setSnack({ open: true, message: (e as Error).message || 'Update failed', severity: 'error' });
                              }
                            }}
                            showInMenu
                          />,
            <GridActionsCellItem
              key="promote-business"
              icon={<BusinessIcon />}
              label="Promote to Business"
              onClick={async () => {
                try {
                  const updated = await adminService.promoteToBusinessAccount(id);
                  setUsers((list) => list.map((u) => (u._id === id ? updated : u)));
                  setSnack({ open: true, message: 'User promoted to business account', severity: 'success' });
                } catch (e: unknown) {
                  setSnack({ open: true, message: (e as Error).message || 'Promotion failed', severity: 'error' });
                }
              }}
              showInMenu
            />,
            <GridActionsCellItem
              key="temp-admin-1day"
              icon={<AccessTimeIcon />}
              label="Temp Admin (1 Day)"
              onClick={async () => {
                try {
                  const updated = await adminService.assignTempAdminPrivileges(id, '1day');
                  setUsers((list) => list.map((u) => (u._id === id ? updated : u)));
                  setSnack({ open: true, message: 'Temporary admin privileges assigned for 1 day', severity: 'success' });
                } catch (e: unknown) {
                  setSnack({ open: true, message: (e as Error).message || 'Failed to assign temp admin', severity: 'error' });
                }
              }}
              showInMenu
            />,
            <GridActionsCellItem
              key="temp-admin-1week"
              icon={<AccessTimeIcon />}
              label="Temp Admin (1 Week)"
              onClick={async () => {
                try {
                  const updated = await adminService.assignTempAdminPrivileges(id, '1week');
                  setUsers((list) => list.map((u) => (u._id === id ? updated : u)));
                  setSnack({ open: true, message: 'Temporary admin privileges assigned for 1 week', severity: 'success' });
                } catch (e: unknown) {
                  setSnack({ open: true, message: (e as Error).message || 'Failed to assign temp admin', severity: 'error' });
                }
              }}
              showInMenu
            />,
            <GridActionsCellItem
              key="temp-admin-1month"
              icon={<AccessTimeIcon />}
              label="Temp Admin (1 Month)"
              onClick={async () => {
                try {
                  const updated = await adminService.assignTempAdminPrivileges(id, '1month');
                  setUsers((list) => list.map((u) => (u._id === id ? updated : u)));
                  setSnack({ open: true, message: 'Temporary admin privileges assigned for 1 month', severity: 'success' });
                } catch (e: unknown) {
                  setSnack({ open: true, message: (e as Error).message || 'Failed to assign temp admin', severity: 'error' });
                }
              }}
              showInMenu
            />,
            <GridActionsCellItem
              key="delete"
              icon={<DeleteIcon />}
              label="Delete"
              onClick={async () => {
                try {
                  await adminService.deleteUser(id);
                  setUsers((list) => list.filter((u) => u._id !== id));
                  setSnack({ open: true, message: 'User deleted', severity: 'success' });
                } catch (e: unknown) {
                  setSnack({ open: true, message: (e as Error).message || 'Delete failed', severity: 'error' });
                }
              }}
              showInMenu
            />,
          ];
        },
      },
    ], []);

  const productFormValid = newProduct.name && newProduct.descriptions && newProduct.version && newProduct.image && newProduct.price >= 0;

  const handleAddFeature = () => {
    const parts = featuresInput
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean);
    if (parts.length) {
      setNewProduct((p) => ({ ...p, features: Array.from(new Set([...(p.features || []), ...parts])) }));
      setFeaturesInput('');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar onLoginClick={() => {}} onRegisterClick={() => {}} />
      
      {/* Hero Section */}
      <Box
        sx={{
          background: (theme) => theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 6,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Box>
              <Typography variant="h2" fontWeight={800} gutterBottom>
                Admin Dashboard
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Manage users, products, and system settings
              </Typography>
            </Box>
            <Chip 
              color="primary" 
              icon={<AdminPanelSettingsIcon />} 
              label="Administrator" 
              sx={{ 
                fontWeight: 700,
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                backdropFilter: 'blur(10px)',
                fontSize: '1rem',
                height: 40,
                px: 2
              }} 
            />
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Quick Action Cards */}
        <Box sx={{ display: 'flex', gap: 3, mb: 4, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <Card
              elevation={0}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: 3,
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 30px rgba(102, 126, 234, 0.3)',
                },
              }}
              onClick={() => setTab('users')}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <PersonAddIcon sx={{ fontSize: '2rem' }} />
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight={700} gutterBottom>
                      👥 User Management
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Create, edit, and manage user accounts, roles, and permissions
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <Card
              elevation={0}
              sx={{
                background: 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)',
                color: 'white',
                borderRadius: 3,
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 30px rgba(0, 212, 170, 0.3)',
                },
              }}
              onClick={() => setTab('products')}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <AddIcon sx={{ fontSize: '2rem' }} />
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight={700} gutterBottom>
                      📦 Product Management
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Add, edit, and manage product catalog, pricing, and inventory
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Paper 
          elevation={0} 
          sx={{ 
            borderRadius: 3, 
            overflow: 'hidden', 
            border: '1px solid', 
            borderColor: 'divider', 
            bgcolor: 'background.paper',
            boxShadow: (theme) => theme.palette.mode === 'dark' 
              ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
              : '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tab} 
              onChange={(_e, v) => setTab(v)} 
              variant="scrollable" 
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  minHeight: 64,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  px: 4,
                },
                '& .Mui-selected': {
                  color: 'primary.main',
                },
              }}
            >
              <Tab 
                value="users" 
                label="👥 User Management" 
                sx={{ minWidth: 200 }}
              />
              <Tab 
                value="products" 
                label="📦 Product Management" 
                sx={{ minWidth: 200 }}
              />
            </Tabs>
          </Box>

          <Divider />

          {tab === 'users' && (
            <Box sx={{ p: 2 }}>
              {/* Create New User Form */}
              <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Create New User</Typography>
                <Stack spacing={2}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                  </Stack>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    helperText="Password must be at least 8 characters and include a special character"
                  />
                  <TextField
                    fullWidth
                    label="Israeli Mobile Number"
                    type="tel"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    placeholder="05XXXXXXXX"
                    helperText="Format: 05XXXXXXXX (Israeli mobile number) - Optional"
                  />
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button
                      variant="contained"
                      startIcon={<PersonAddIcon />}
                      onClick={async () => {
                        setCreatingUser(true);
                        try {
                          const created = await adminService.createUser(newUser);
                          setUsers((list) => [created, ...list]);
                          setNewUser({ name: '', email: '', password: '', phone: '', isAdmin: false, isBusiness: false, isUser: true });
                          setSnack({ open: true, message: 'User created successfully', severity: 'success' });
                        } catch (e: unknown) {
                          setSnack({ open: true, message: (e as Error).message || 'Failed to create user', severity: 'error' });
                        } finally {
                          setCreatingUser(false);
                        }
                      }}
                      disabled={!newUser.name || !newUser.email || !newUser.password || creatingUser}
                    >
                      Create User
                    </Button>
                  </Stack>
                </Stack>
              </Paper>

              <Box sx={{ mb: 2 }}>
                <Alert severity="info" sx={{ borderRadius: 2 }}>
                  💡 <strong>Tip:</strong> Double-click any cell in Name, Email, or Phone columns to edit. Phone format: 05XXXXXXXX (leave empty if not available).
                </Alert>
              </Box>
              
              <DataGrid
                density="comfortable"
                autoHeight
                rows={users.map((u) => ({ id: u._id, ...u }))}
                columns={userColumns}
                loading={loadingUsers}
                disableRowSelectionOnClick
                sx={{ 
                  '& .MuiDataGrid-cell': { outline: 'none' },
                  '& .MuiDataGrid-cell--editable': {
                    backgroundColor: 'action.hover',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'action.selected',
                    },
                    '&::after': {
                      content: '"✏️"',
                      position: 'absolute',
                      top: 2,
                      right: 2,
                      fontSize: '0.7rem',
                      opacity: 0.6,
                    },
                  },
                }}
                processRowUpdate={async (newRow: AdminUser & { id: string }) => {
                  try {
                    console.log('🔄 Frontend: Updating user:', newRow.id);
                    console.log('🔄 Frontend: Update data:', {
                      name: newRow.name,
                      email: newRow.email,
                      phone: newRow.phone,
                      isAdmin: !!newRow.isAdmin,
                      isBusiness: !!newRow.isBusiness,
                      isUser: newRow.isUser !== false,
                    });
                    
                    const updateData = {
                      name: newRow.name || '',
                      email: newRow.email || '',
                      phone: newRow.phone || '',
                      isAdmin: !!newRow.isAdmin,
                      isBusiness: !!newRow.isBusiness,
                      isUser: newRow.isUser !== false,
                    };
                    
                    const updated = await adminService.updateUser(newRow.id, updateData);
                    console.log('✅ Frontend: Update successful:', updated);
                    
                    setUsers((list) => list.map((u) => (u._id === newRow.id ? updated : u)));
                    setSnack({ open: true, message: '✅ User updated successfully!', severity: 'success' });
                    
                    // Return the updated data for the DataGrid
                    return { ...newRow, ...updated };
                  } catch (e: any) {
                    console.error('❌ Frontend update error:', e);
                    
                    let errorMessage = 'Update failed';
                    if (e?.message) {
                      errorMessage = e.message;
                    }
                    
                    console.log('🔴 Showing error message:', errorMessage);
                    setSnack({ open: true, message: `❌ ${errorMessage}`, severity: 'error' });
                    
                    // Re-throw to prevent DataGrid from updating
                    throw new Error(errorMessage);
                  }
                }}
                onProcessRowUpdateError={(error) => {
                  console.error('🔴 DataGrid update error:', error);
                  // Don't show additional error message here as it's already handled in processRowUpdate
                }}
              />
            </Box>
          )}

          {tab === 'products' && (
            <Box sx={{ p: 4 }}>
              {/* Create New Product Form */}
              <Paper elevation={1} sx={{ p: 4, mb: 4, borderRadius: 3, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AddIcon color="primary" />
                  Create New Product
                </Typography>
                
                <Stack spacing={3}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField 
                      fullWidth 
                      label="Product Name" 
                      value={newProduct.name} 
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      variant="outlined"
                      required
                    />
                    <TextField 
                      fullWidth 
                      label="Version" 
                      value={newProduct.version} 
                      onChange={(e) => setNewProduct({ ...newProduct, version: e.target.value })}
                      variant="outlined"
                      required
                    />
                  </Stack>
                  
                  <TextField 
                    fullWidth 
                    multiline 
                    minRows={4} 
                    label="Product Description" 
                    value={newProduct.descriptions} 
                    onChange={(e) => setNewProduct({ ...newProduct, descriptions: e.target.value })}
                    variant="outlined"
                    required
                    helperText="Provide a detailed description of the product"
                  />
                  
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField 
                      fullWidth 
                      type="number" 
                      label="Price ($)" 
                      value={newProduct.price} 
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                      variant="outlined"
                      required
                      inputProps={{ min: 0, step: 0.01 }}
                    />
                    <TextField 
                      fullWidth 
                      label="Image URL" 
                      value={newProduct.image} 
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      variant="outlined"
                      required
                      helperText="Enter the full URL to the product image"
                    />
                  </Stack>
                  
                  <Box>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="flex-start">
                      <TextField 
                        fullWidth 
                        label="Features (comma separated)" 
                        value={featuresInput} 
                        onChange={(e) => setFeaturesInput(e.target.value)}
                        variant="outlined"
                        placeholder="e.g. Bluetooth, Fingerprint, Mobile App"
                        helperText="Add features separated by commas"
                      />
                      <Button 
                        variant="outlined" 
                        startIcon={<AddIcon />} 
                        onClick={handleAddFeature}
                        sx={{ minWidth: 120, height: 56 }}
                      >
                        Add Features
                      </Button>
                    </Stack>
                    
                    {(newProduct.features || []).length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                          Product Features:
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                          {(newProduct.features || []).map((f) => (
                            <Chip 
                              key={f} 
                              label={f} 
                              onDelete={() => setNewProduct((p) => ({ ...p, features: (p.features || []).filter((x) => x !== f) }))}
                              color="primary"
                              variant="outlined"
                            />
                          ))}
                        </Stack>
                      </Box>
                    )}
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      disabled={!productFormValid || creatingProduct}
                      onClick={async () => {
                        setCreatingProduct(true);
                        try {
                          const created = await productService.createProduct(newProduct);
                          setProducts((list) => [created, ...list]);
                          setNewProduct({ name: '', descriptions: '', version: '', features: [], price: 0, image: '' });
                          setFeaturesInput('');
                          setSnack({ open: true, message: 'Product created successfully!', severity: 'success' });
                        } catch (e: unknown) {
                          setSnack({ open: true, message: (e as Error).message || 'Failed to create product', severity: 'error' });
                        } finally {
                          setCreatingProduct(false);
                        }
                      }}
                      size="large"
                      sx={{ minWidth: 150 }}
                    >
                      {creatingProduct ? 'Creating...' : 'Create Product'}
                    </Button>
                    
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setNewProduct({ name: '', descriptions: '', version: '', features: [], price: 0, image: '' });
                        setFeaturesInput('');
                      }}
                      size="large"
                    >
                      Clear Form
                    </Button>
                  </Box>
                </Stack>
              </Paper>

              {/* Existing Products Table */}
              <Paper elevation={1} sx={{ borderRadius: 3, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="h5" fontWeight={700} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    📦 Product Inventory ({products.length})
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Manage your existing products, edit details, or remove items
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Alert severity="info" sx={{ borderRadius: 2 }}>
                    💡 <strong>Tip:</strong> Double-click any cell in Name, Version, Price, or Description columns to edit. Click the Save icon to apply changes.
                  </Alert>
                </Box>
                
                <DataGrid
                  density="comfortable"
                  autoHeight
                  rows={products.map((p, index) => ({ 
                    ...p,
                    id: (p as Product & { _id?: string })._id || p.id || `product-${index}`
                  }))}
                  columns={[
                    { 
                      field: 'name', 
                      headerName: 'Product Name', 
                      flex: 1.2,
                      minWidth: 200,
                      editable: true,
                      renderCell: (params) => (
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {params.value}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            v{params.row.version}
                          </Typography>
                        </Box>
                      )
                    },
                    { 
                      field: 'version', 
                      headerName: 'Version', 
                      width: 100,
                      editable: true,
                      renderCell: (params) => (
                        <Chip 
                          label={`v${params.value}`} 
                          size="small" 
                          color="secondary"
                          variant="outlined"
                        />
                      )
                    },
                    { 
                      field: 'price', 
                      headerName: 'Price', 
                      width: 120,
                      editable: true,
                      type: 'number',
                      renderCell: (params) => (
                        <Typography variant="subtitle2" color="primary" fontWeight={600}>
                          ${Number(params.value || 0).toFixed(2)}
                        </Typography>
                      )
                    },
                    { 
                      field: 'descriptions', 
                      headerName: 'Description', 
                      flex: 2,
                      minWidth: 300,
                      editable: true,
                      renderCell: (params) => (
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            lineHeight: 1.4
                          }}
                        >
                          {params.value}
                        </Typography>
                      )
                    },
                    {
                      field: 'features',
                      headerName: 'Features',
                      flex: 1,
                      minWidth: 200,
                      renderCell: (params) => (
                        <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                          {(params.value || []).slice(0, 2).map((feature: string) => (
                            <Chip 
                              key={feature}
                              label={feature} 
                              size="small" 
                              variant="outlined"
                              sx={{ fontSize: '0.75rem' }}
                            />
                          ))}
                          {(params.value || []).length > 2 && (
                            <Chip 
                              label={`+${(params.value || []).length - 2}`} 
                              size="small" 
                              color="primary"
                              sx={{ fontSize: '0.75rem' }}
                            />
                          )}
                        </Stack>
                      )
                    },
                    {
                      field: 'actions',
                      type: 'actions',
                      headerName: 'Actions',
                      width: 140,
                      getActions: (params: GridRowParams) => {
                        const id = String(params.id);
                        const row = params.row as Product;
                        return [
                          <GridActionsCellItem
                            key="edit"
                            icon={<EditIcon />}
                            label="Edit Product Details"
                            onClick={() => {
                              setSnack({ open: true, message: 'Double-click any cell to edit product details', severity: 'info' });
                            }}
                            showInMenu
                          />,
                          <GridActionsCellItem
                            key="save"
                            icon={<SaveIcon />}
                            label="Save Changes"
                            onClick={async () => {
                              try {
                                await productService.updateProduct(id, {
                                  name: row.name,
                                  version: row.version,
                                  price: row.price,
                                  descriptions: row.descriptions,
                                  features: row.features,
                                  image: row.image
                                });
                                setSnack({ open: true, message: 'Product updated successfully!', severity: 'success' });
                                // Refresh products list
                                const updatedProducts = await productService.getAllProducts();
                                setProducts(updatedProducts);
                              } catch (e: unknown) {
                                setSnack({ open: true, message: (e as Error).message || 'Failed to update product', severity: 'error' });
                              }
                            }}
                            showInMenu
                          />,
                          <GridActionsCellItem
                            key="delete"
                            icon={<DeleteIcon />}
                            label="Delete Product"
                            onClick={async () => {
                              if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
                                try {
                                  await productService.deleteProduct(id);
                                  setProducts((list) => list.filter((p) => ((p as Product & { _id?: string })._id || `product-${list.indexOf(p)}`) !== id));
                                  setSnack({ open: true, message: 'Product deleted successfully!', severity: 'success' });
                                } catch (e: unknown) {
                                  setSnack({ open: true, message: (e as Error).message || 'Failed to delete product', severity: 'error' });
                                }
                              }
                            }}
                          />,
                        ];
                      },
                    },
                  ]}
                  loading={loadingProducts}
                  disableRowSelectionOnClick
                  sx={{
                    border: 'none',
                    '& .MuiDataGrid-cell': { 
                      outline: 'none',
                      py: 1
                    },
                    '& .MuiDataGrid-cell--editable': {
                      backgroundColor: 'action.hover',
                      '&:hover': {
                        backgroundColor: 'action.selected',
                      },
                    },
                    '& .MuiDataGrid-row': {
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    },
                    '& .MuiDataGrid-columnHeaders': {
                      backgroundColor: 'action.hover',
                      fontWeight: 600,
                    },
                  }}
                  processRowUpdate={async (newRow: Product & { id: string }) => {
                    try {
                      const updated = await productService.updateProduct(newRow.id, {
                        name: newRow.name,
                        version: newRow.version,
                        price: newRow.price,
                        descriptions: newRow.descriptions,
                        features: newRow.features,
                        image: newRow.image
                      });
                      setProducts((list) => list.map((p) => {
                        const productId = (p as Product & { _id?: string })._id || p.id;
                        return productId === newRow.id ? { ...p, ...updated } : p;
                      }));
                      setSnack({ open: true, message: 'Product updated successfully!', severity: 'success' });
                      return { ...newRow, ...updated };
                    } catch (e: unknown) {
                      setSnack({ open: true, message: (e as Error).message || 'Failed to update product', severity: 'error' });
                      throw e;
                    }
                  }}
                  onProcessRowUpdateError={(error) => {
                    setSnack({ open: true, message: 'Failed to update product', severity: 'error' });
                  }}
                />
              </Paper>
            </Box>
          )}
        </Paper>
      </Container>
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack((s) => ({ ...s, open: false }))}>
        <Alert onClose={() => setSnack((s) => ({ ...s, open: false }))} severity={snack.severity} variant="filled" sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}


