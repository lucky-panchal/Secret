import { Inter } from 'next/font/google';
import { CustomThemeProvider } from '@/contexts/ThemeContext';
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "ReskillingPro - Transform Your Career",
  description: "Professional reskilling platform for career transformation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomThemeProvider>
          {children}
        </CustomThemeProvider>
      </body>
    </html>
  );
}
