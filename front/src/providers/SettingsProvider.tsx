import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import en from '../locales/en.json';
import ar from '../locales/ar.json';
import he from '../locales/he.json';

type Language = 'en' | 'ar' | 'he';
type Mode = 'light' | 'dark';

type Translations = { [key: string]: string | Translations };

type SettingsContextType = {
  lang: Language;
  mode: Mode;
  dir: 'ltr' | 'rtl';
  t: (key: string) => string;
  setLanguage: (lang: Language) => void;
  toggleMode: () => void;
};

const dictionaries: Record<Language, Translations> = {
  en, ar, he
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const [mode, setMode] = useState<Mode>(() => {
    // Load theme from localStorage on initial load
    const saved = localStorage.getItem('theme-mode');
    return (saved as Mode) || 'light';
  });

  // Keep layout stable (no LTR/RTL flipping) as requested
  const dir: 'ltr' | 'rtl' = 'ltr';

  useEffect(() => {
    document.documentElement.setAttribute('dir', dir);
  }, [dir]);

  const theme = useMemo(() => createTheme({
    direction: dir,
    palette: { 
      mode,
      ...(mode === 'dark' && {
        background: {
          default: '#121212',
          paper: '#1e1e1e',
        },
        primary: {
          main: '#00d4aa',
          light: '#4de6c7',
          dark: '#00b894',
        },
        secondary: {
          main: '#f48fb1',
        },
        text: {
          primary: '#ffffff',
          secondary: '#b3b3b3',
        },
      }),
      ...(mode === 'light' && {
        primary: {
          main: '#00d4aa',
          light: '#4de6c7',
          dark: '#00b894',
        },
      }),
    },
    typography: {
      fontFamily: '"Poppins", "Inter", "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 700 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            boxSizing: 'border-box',
          },
          html: {
            height: '100%',
          },
          body: {
            height: '100%',
            margin: 0,
            padding: 0,
            ...(mode === 'dark' && {
              backgroundColor: '#121212',
              color: '#ffffff',
            }),
            ...(mode === 'light' && {
              backgroundColor: '#ffffff',
              color: '#000000',
            }),
          },
          '#root': {
            height: '100%',
            ...(mode === 'dark' && {
              backgroundColor: '#121212',
              color: '#ffffff',
            }),
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            ...(mode === 'dark' && {
              backgroundColor: '#1e1e1e',
              color: '#ffffff',
            }),
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            ...(mode === 'dark' && {
              backgroundColor: '#1e1e1e',
              color: '#ffffff',
            }),
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            ...(mode === 'dark' && {
              backgroundColor: '#1e1e1e',
              color: '#ffffff',
            }),
          },
        },
      },
    },
  }), [dir, mode]);

  const t = (key: string): string => {
    const dict = dictionaries[lang] || {};
    const result = key
      .split('.')
      .reduce<unknown>((obj, part) => (obj && (obj as Record<string, unknown>)[part] !== undefined ? (obj as Record<string, unknown>)[part] : undefined), dict as unknown);
    return typeof result === 'string' ? result : key;
  };

  const setLanguage = (l: Language) => setLang(l);
  const toggleMode = () => {
    setMode((m) => {
      const newMode = m === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-mode', newMode);
      return newMode;
    });
  };

  const value: SettingsContextType = { lang, mode, dir, t, setLanguage, toggleMode };

  return (
    <SettingsContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </SettingsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}


