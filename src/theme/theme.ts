import { createTheme } from '@mantine/core';
import { Montserrat } from 'next/font/google';
import { brandColors } from './colors';

export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mont',
});

export const mantineTheme = createTheme({
  primaryColor: 'brand',
  colors: brandColors,
  fontFamily: 'var(--font-mont), var(--font-mulish), sans-serif',
  headings: {
    fontFamily: 'var(--font-mont), sans-serif',
  },
});
