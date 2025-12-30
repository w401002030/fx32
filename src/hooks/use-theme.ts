import { useEffect } from 'react';
export function useTheme() {
  useEffect(() => {
    // Strictly apply the dark class for this high-contrast brand overhaul
    if (!document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
    }
    // We force the theme to dark in storage to maintain the premium fintech feel
    localStorage.setItem('theme', 'dark');
  }, []);
  const toggleTheme = () => {
    // Toggling is disabled to maintain the brand aesthetic
  };
  return { isDark: true, toggleTheme };
}