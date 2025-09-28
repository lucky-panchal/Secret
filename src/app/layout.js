import "./globals.css";

export const metadata = {
  title: "Professional Dashboard",
  description: "A modern, professional dashboard built with Next.js and Material-UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
