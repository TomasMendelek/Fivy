"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await fetch("https://1-servicio-autenticacion-production-42b4.up.railway.app/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
  
      // Leer la respuesta como texto
      const textResponse = await response.text();
      console.log("Response Text:", textResponse);
  
      // Si la respuesta es solo el userId (sin el token)
      if (textResponse) {
        // Guardar el userId en localStorage
        localStorage.setItem("userId", textResponse); // Guardar solo el _id del usuario
  
        toast({
          title: "Success",
          description: "Logged in successfully.",
        });
  
        // Redirigir a /profile/create
        router.push("/profile/create");
      } else {
        throw new Error("Unexpected response format.");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Función para redirigir al formulario de registro
  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            {/* Botón para redirigir al registro */}
            <Button variant="outline" className="w-full" onClick={handleRegisterRedirect}>
              Don&apos;t have an account? Register here
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
