import { useState } from 'react';
import { Alert, Box, Button, Checkbox, FormControlLabel, Stack, TextField } from '@mui/material';
import { authService } from '../../services/authService';
import { authStorage } from '../../services/authStorage';
import type { RegisterRequest, User } from '../../types/auth';

type Props = {
  onSuccess?: (user: User) => void;
};

export default function RegisterForm({ onSuccess }: Props) {
  const [values, setValues] = useState<RegisterRequest>({ name: '', email: '', password : '', isBusiness: false });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await authService.register(values);
      if (res.token) authStorage.setToken(res.token);
      onSuccess?.(res.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={3}>
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              borderRadius: '12px',
              backgroundColor: '#ffebee',
              color: '#c62828',
            }}
          >
            {error}
          </Alert>
        )}
        <TextField
          label="Full Name"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          required
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              '& fieldset': {
                borderColor: '#e0e0e0',
              },
              '&:hover fieldset': {
                borderColor: '#00d4aa',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00d4aa',
              },
            },
          }}
        />
        <TextField
          label="Email"
          type="email"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          required
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              '& fieldset': {
                borderColor: '#e0e0e0',
              },
              '&:hover fieldset': {
                borderColor: '#00d4aa',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00d4aa',
              },
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          value={values.password}
          onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
          required
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              '& fieldset': {
                borderColor: '#e0e0e0',
              },
              '&:hover fieldset': {
                borderColor: '#00d4aa',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00d4aa',
              },
            },
          }}
        />
          <FormControlLabel
          control={
            <Checkbox
              checked={values.isBusiness}
              onChange={(e) => setValues((v) => ({ ...v, isBusiness: e.target.checked }))}
            />
          }
          label="Business"
        />
   
        <Button 
          type="submit" 
          variant="contained" 
          disabled={submitting}
          sx={{
            backgroundColor: '#00d4aa',
            color: 'white',
            borderRadius: '12px',
            py: 1.5,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#00b894',
            },
            '&:disabled': {
              backgroundColor: '#e0e0e0',
              color: '#9e9e9e',
            },
          }}
        >
          {submitting ? 'Creating account…' : 'Create Account'}
        </Button>
      </Stack>
    </Box>
  );
}


