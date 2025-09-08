import { useState } from 'react';
import { Alert, Box, Button, Stack, TextField } from '@mui/material';
import { authService } from '../../services/authService';
import { authStorage } from '../../services/authStorage';
import type { RegisterRequest, User } from '../../types/auth';

type Props = {
  onSuccess?: (user: User) => void;
};

export default function RegisterForm({ onSuccess }: Props) {
  const [values, setValues] = useState<RegisterRequest>({ name: '', email: '', password: '' });
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
    } catch (err: any) {
      setError(err?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Name"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          required
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          required
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={values.password}
          onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" disabled={submitting}>
          {submitting ? 'Creating account…' : 'Create account'}
        </Button>
      </Stack>
    </Box>
  );
}


