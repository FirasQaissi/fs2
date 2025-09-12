import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { Alert, Box, Button, Checkbox, FormControlLabel, Stack, TextField } from '@mui/material';
import { authService } from '../../services/authService';
import { authStorage } from '../../services/authStorage';
import type { LoginRequest, User } from '../../types/auth';

type Props = {
  onSuccess?: (user: User) => void;
};

export default function LoginForm({ onSuccess }: Props) {
  const [values, setValues] = useState<LoginRequest>({ email: '', password: '', isBusiness: false });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remember, setRemember] = useState(false);

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PASSWORD_REGEX = /^(?=.*[!@%$#^&*\-_]).{8,}$/;

  const emailError = values.email.length > 0 && !EMAIL_REGEX.test(values.email) ? 'Enter a valid email' : '';
  const passwordError = values.password.length > 0 && !PASSWORD_REGEX.test(values.password)
    ? 'Min 8 chars, include !@%$#^&*-_'
    : '';
  const isValid = useMemo(() => EMAIL_REGEX.test(values.email) && PASSWORD_REGEX.test(values.password), [values.email, values.password]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await authService.login(values);
      if (res.token) {
        authStorage.setToken(res.token);
        authStorage.setUser(res.user);
      }
      onSuccess?.(res.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
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
          label="Email"
          type="email"
          value={values.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValues((v: LoginRequest) => ({ ...v, email: e.target.value }))}
          error={!!emailError}
          helperText={emailError}
          required
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              '& fieldset': {
                borderColor: emailError ? '#e53935' : '#e0e0e0',
              },
              '&:hover fieldset': {
                borderColor: emailError ? '#e53935' : '#00d4aa',
              },
              '&.Mui-focused fieldset': {
                borderColor: emailError ? '#e53935' : '#00d4aa',
              },
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          value={values.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValues((v: LoginRequest) => ({ ...v, password: e.target.value }))}
          error={!!passwordError}
          helperText={passwordError}
          required
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              '& fieldset': {
                borderColor: passwordError ? '#e53935' : '#e0e0e0',
              },
              '&:hover fieldset': {
                borderColor: passwordError ? '#e53935' : '#00d4aa',
              },
              '&.Mui-focused fieldset': {
                borderColor: passwordError ? '#e53935' : '#00d4aa',
              },
            },
          }}
        />
        <FormControlLabel
          control={<Checkbox checked={remember} onChange={(e: ChangeEvent<HTMLInputElement>) => setRemember(e.target.checked)} />}
          label="Remember me"
        />
        <Button 
          type="submit" 
          variant="contained" 
          disabled={submitting || !isValid}
          sx={{
            backgroundColor: '#1a1a1a',
            color: 'white',
            borderRadius: '12px',
            py: 1.5,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#2d2d2d',
            },
            '&:disabled': {
              backgroundColor: '#e0e0e0',
              color: '#9e9e9e',
            },
          }}
        >
          {submitting ? 'Signing in…' : 'Sign In'}
        </Button>
      </Stack>
    </Box>
  );
}


