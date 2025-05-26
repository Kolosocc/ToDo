'use client';

import { useEffect, useState } from 'react';
import { LuSun, LuMoon } from 'react-icons/lu';
import { THEME_KEY, getInitialTheme, applyTheme } from '@/lib/theme';
import { motion } from 'framer-motion';

export const ThemeToggle = () => {
  // null — тема пока не инициализирована
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    // инициализация темы после монтирования
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggleTheme = () => {
    if (!theme) return; // защита на случай, если тема еще не установлена

    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    applyTheme(newTheme);
  };

  if (!theme) return null;

  return (
    <motion.button
      onClick={toggleTheme}
      className='w-10 h-10 p-2 mx-4 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 flex items-center justify-center transition-colors'
      aria-label='Toggle theme'
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {theme === 'light' ? <LuSun size={20} /> : <LuMoon size={20} />}
    </motion.button>
  );
};

export default ThemeToggle;
