import { ReactNode } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <main className="container mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}
