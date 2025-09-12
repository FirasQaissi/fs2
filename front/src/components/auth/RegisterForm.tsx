import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
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
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PASSWORD_REGEX = /^(?=.*[!@%$#^&*\-_]).{8,}$/;

  const nameError = values.name.length === 0 ? '' : values.name.trim().length < 2 ? 'Enter your full name' : '';
  const emailError = values.email.length > 0 && !EMAIL_REGEX.test(values.email) ? 'Enter a valid email' : '';
  const passwordError = values.password.length > 0 && !PASSWORD_REGEX.test(values.password)
    ? 'Min 8 chars, include !@%$#^&*-_'
    : '';
  const isValid = useMemo(() => values.name.trim().length >= 2 && EMAIL_REGEX.test(values.email) && PASSWORD_REGEX.test(values.password), [values]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await authService.register(values);
      if (res.token) {
        authStorage.setToken(res.token);
        authStorage.setUser(res.user);
      }
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValues((v: RegisterRequest) => ({ ...v, name: e.target.value }))}
          error={!!nameError}
          helperText={nameError}
          required
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              '& fieldset': {
                borderColor: nameError ? '#e53935' : '#e0e0e0',
              },
              '&:hover fieldset': {
                borderColor: nameError ? '#e53935' : '#00d4aa',
              },
              '&.Mui-focused fieldset': {
                borderColor: nameError ? '#e53935' : '#00d4aa',
              },
            },
          }}
        />
        <TextField
          label="Email"
          type="email"
          value={values.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValues((v: RegisterRequest) => ({ ...v, email: e.target.value }))}
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValues((v: RegisterRequest) => ({ ...v, password: e.target.value }))}
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
          disabled={submitting || !isValid}
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


