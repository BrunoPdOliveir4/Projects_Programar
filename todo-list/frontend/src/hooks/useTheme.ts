import { useCallback } from 'react';

export const useTheme = () => {
  const getStoredTheme = (): 'light' | 'dark' => {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  };

  const toggleTheme = useCallback(() => {
    const currentTheme = getStoredTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    window.dispatchEvent(new Event('themeChange'));
  }, []);

  return {
    currentTheme: getStoredTheme(),
    toggleTheme,
  };
};
