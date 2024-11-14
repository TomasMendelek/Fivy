"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function ProfileCreatePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [publicacionesIds, setPublicacionesIds] = useState<string[]>([]);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);

  // Función para obtener el usuarioId desde el localStorage
  const fetchUserData = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in.",
      });
      router.push("/login"); // Redirigir al login si no hay userId
      return;
    }
    setUsuarioId(userId); // Establecer el usuarioId en el estado
  };

  useEffect(() => {
    fetchUserData(); // Solo se ejecuta una vez cuando el componente se monta
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!usuarioId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Usuario no encontrado.",
      });
      return;
    }

    try {
      const response = await fetch("https://2-servicio-gestion-usuarios-production.up.railway.app/api/perfiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuarioId, // Aquí se pasa el userId que obtuviste de localStorage
          username,
          bio,
          imageUrl,
          publicacionesIds,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear el perfil");
      }

      toast({
        title: "Profile created",
        description: "Your profile has been created successfully.",
      });
      router.push("/"); // Redirigir a la página principal
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <h1 className="text-3xl font-bold">Create Profile</h1>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Bio"
                required
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Image URL"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Profile..." : "Create Profile"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
