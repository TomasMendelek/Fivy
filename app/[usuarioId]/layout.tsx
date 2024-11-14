"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para manejar el loading

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.replace("/login"); // Usa replace en lugar de push
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false); // Cambia loading a false después de la verificación
  }, [router]);

  // Muestra un loader mientras se verifica la autenticación
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Toaster />
      <div>{children}</div>
    </>
  );
}
