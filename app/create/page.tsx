"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Image, Upload } from "lucide-react";

export default function CreatePostPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Add your post creation logic here
      // const response = await fetch("your-posts-microservice-url/create", ...);
      
      toast({
        title: "Success",
        description: "Your post has been created.",
      });
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create post. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            {preview ? (
              <div className="relative aspect-square">
                <img
                  src={preview}
                  alt="Preview"
                  className="object-cover w-full h-full rounded-lg"
                />
                <Button
                  type="button"
                  variant="secondary"
                  className="absolute top-2 right-2"
                  onClick={() => setPreview(null)}
                >
                  Change
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Image className="h-12 w-12 text-muted-foreground" />
                </div>
                <div>
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Button type="button" variant="secondary">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Textarea
              placeholder="Write a caption..."
              className="min-h-[100px]"
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!preview || isLoading}
          >
            {isLoading ? "Creating..." : "Share"}
          </Button>
        </form>
      </Card>
    </div>
  );
}