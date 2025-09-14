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
} from '@mui/material';
import { 
  DataGrid, 
  GridActionsCellItem, 
  type GridColDef, 
  type GridRowParams} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
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

  const userColumns: GridColDef[] = useMemo(
    () => [
      { field: 'name', headerName: 'Name', flex: 1, editable: true },
      { field: 'email', headerName: 'Email', flex: 1.2 },
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
              key="save"
              icon={<SaveIcon />}
              label="Save"
              onClick={async () => {
                try {
                  const updated = await adminService.updateUser(id, {
                    name: row.name,
                    isAdmin: !!row.isAdmin,
                    isBusiness: !!row.isBusiness,
                    isUser: row.isUser !== false,
                  });
                  setUsers((list) => list.map((u) => (u._id === id ? updated : u)));
                  setSnack({ open: true, message: 'User updated', severity: 'success' });
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
    ],
    []
  );

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
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fb' }}>
      <Navbar onLoginClick={() => {}} onRegisterClick={() => {}} />
      <Container sx={{ py: 4 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h4" fontWeight={800}>Admin Dashboard</Typography>
          <Chip color="primary" icon={<AdminPanelSettingsIcon />} label="Admin" sx={{ fontWeight: 700 }} />
        </Stack>

        <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Tabs value={tab} onChange={(_e, v) => setTab(v)} variant="scrollable" scrollButtons="auto">
            <Tab value="users" label="Users" />
            <Tab value="products" label="Products" />
          </Tabs>

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
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button
                      variant="contained"
                      startIcon={<PersonAddIcon />}
                      onClick={async () => {
                        setCreatingUser(true);
                        try {
                          const created = await adminService.createUser(newUser);
                          setUsers((list) => [created, ...list]);
                          setNewUser({ name: '', email: '', password: '', isAdmin: false, isBusiness: false, isUser: true });
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

              <DataGrid
                density="comfortable"
                autoHeight
                rows={users.map((u) => ({ id: u._id, ...u }))}
                columns={userColumns}
                loading={loadingUsers}
                disableRowSelectionOnClick
                sx={{ '& .MuiDataGrid-cell': { outline: 'none' } }}
                processRowUpdate={(newRow: AdminUser & { id: string }) => {
                  setUsers((list) => list.map((u) => (u._id === newRow.id ? { ...u, ...newRow } : u)));
                  return newRow;
                }}
              />
            </Box>
          )}

          {tab === 'products' && (
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Add New Product</Typography>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
                <TextField fullWidth label="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                <TextField fullWidth label="Version" value={newProduct.version} onChange={(e) => setNewProduct({ ...newProduct, version: e.target.value })} />
              </Stack>
              <TextField fullWidth multiline minRows={3} label="Description" value={newProduct.descriptions} onChange={(e) => setNewProduct({ ...newProduct, descriptions: e.target.value })} sx={{ mb: 2 }} />
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
                <TextField fullWidth type="number" label="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })} />
                <TextField fullWidth label="Image URL" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
              </Stack>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
                <TextField fullWidth label="Features (comma separated)" value={featuresInput} onChange={(e) => setFeaturesInput(e.target.value)} />
                <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddFeature}>Add</Button>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
                {(newProduct.features || []).map((f) => (
                  <Chip key={f} label={f} onDelete={() => setNewProduct((p) => ({ ...p, features: (p.features || []).filter((x) => x !== f) }))} />
                ))}
              </Stack>
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
                    setSnack({ open: true, message: 'Product created', severity: 'success' });
                  } catch (e: unknown) {
                    setSnack({ open: true, message: (e as Error).message || 'Create failed', severity: 'error' });
                  } finally {
                    setCreatingProduct(false);
                  }
                }}
              >
                Create Product
              </Button>

              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>Existing Products</Typography>
              <DataGrid
                density="comfortable"
                autoHeight
                rows={products.map((p, index) => ({ 
                  ...p,
                  id: (p as Product & { _id?: string })._id || p.id || `product-${index}`
                }))}
                columns={[
                  { field: 'name', headerName: 'Name', flex: 1 },
                  { field: 'version', headerName: 'Version', width: 140 },
                  { field: 'price', headerName: 'Price', width: 140, valueFormatter: (params: { value?: number }) => `$${Number(params?.value || 0).toFixed(2)}` },
                  { field: 'descriptions', headerName: 'Description', flex: 1.4 },
                  {
                    field: 'actions',
                    type: 'actions',
                    getActions: (params: GridRowParams) => {
                      const id = String(params.id);
                      return [
                        <GridActionsCellItem
                          key="delete"
                          icon={<DeleteIcon />}
                          label="Delete"
                          onClick={async () => {
                            try {
                              await productService.deleteProduct(id);
                              setProducts((list) => list.filter((p) => ((p as Product & { _id?: string })._id || `product-${list.indexOf(p)}`) !== id));
                              setSnack({ open: true, message: 'Product deleted', severity: 'success' });
                            } catch (e: unknown) {
                              setSnack({ open: true, message: (e as Error).message || 'Delete failed', severity: 'error' });
                            }
                          }}
                          showInMenu
                        />,
                      ];
                    },
                  },
                ]}
                loading={loadingProducts}
                disableRowSelectionOnClick
              />
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


