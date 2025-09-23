import { Inter } from 'next/font/google';
import { CustomThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import "./globals.css";
import "@/styles/performance.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "KauShalX - Transform Your Career",
  description: "Your Future is Our Mission - AI-Powered Learning Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CustomThemeProvider>
            {children}
          </CustomThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
