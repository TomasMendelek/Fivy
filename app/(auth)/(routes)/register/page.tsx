"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const res = await fetch("https://1-servicio-autenticacion-production-42b4.up.railway.app/api/usuarios/registrar", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      // Leer la respuesta como texto primero para inspeccionarla
      const textResponse = await res.text(); 
      console.log("Response Text:", textResponse); // Ver el contenido de la respuesta
  
      // Intentar analizar la respuesta como JSON
      try {
        const data = JSON.parse(textResponse); // Solo intentamos esto si la respuesta es JSON
        if (res.ok) {
          // Guardar el ID del usuario en el localStorage
          localStorage.setItem("userId", data.id);
  
          // Mostrar el mensaje de éxito
          toast({
            title: "Success",
            description: "Registration successful. Redirecting to create your profile...",
          });
  
          // Redirigir al usuario para crear su perfil
          router.push("/profile/create");
        } else {
          throw new Error(data.message || "Registration failed. Please try again.");
        }
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        // Si la respuesta no es JSON, mostrar el error y el texto de la respuesta
        throw new Error(`Failed to parse JSON. Response: ${textResponse}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again later.",
      });
    }
  };  
  
  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <h1 className="text-3xl font-bold">Register</h1>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Register
            </Button>
            <Button
              type="button"
              className="w-full bg-gray-200 hover:bg-gray-300"
              onClick={() => router.push("/login")}
            >
              Already have an account? Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
