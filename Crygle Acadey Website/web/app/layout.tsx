import type { Metadata } from 'next';
import { NavBar } from '@/components/navigation/NavBar.jsx';
import { Footer } from '@/components/navigation/Footer.jsx';
import './globals.css';

export const metadata: Metadata = {
  title: 'Crygle Academy',
  description:
    'Platform belajar kreatif digital — desain, coding, dan robotika untuk Santri SD hingga SMK.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <NavBar assetBase="/" />
        <main>{children}</main>
        <Footer assetBase="/" />
      </body>
    </html>
  );
}
