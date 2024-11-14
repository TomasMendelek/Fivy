"use client";

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/navbar';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Verificar si hay un token de autenticación
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      // Si no hay token, redirigir al login
      router.push('/login');
    }
  }, [router]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen pt-16 bg-background">
            {children}
          </main>
          <Toaster /> {/* Componente para mostrar notificaciones */}
        </ThemeProvider>
      </body>
    </html>
  );
}
