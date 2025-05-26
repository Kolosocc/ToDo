export const THEME_KEY = process.env.NEXT_PUBLIC_THEME_KEY || 'theme';

export const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';

  const stored = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return (stored ?? (prefersDark ? 'dark' : 'light')) as 'light' | 'dark';
};

export const applyTheme = (theme: 'light' | 'dark') => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
};
