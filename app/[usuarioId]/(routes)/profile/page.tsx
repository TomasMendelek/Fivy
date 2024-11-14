'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Grid3X3, Settings, ImageIcon, Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export default function ProfilePage() {
  const posts = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      likes: 1234,
      comments: 45,
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1682687221248-3116ba6ab483?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      likes: 892,
      comments: 23,
    },
  ];

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-32 w-32">
            <Image
              fill
              src="https://avatars.githubusercontent.com/u/143723168?v=4"
              alt="Profile"
              className="object-cover"
            />
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <h1 className="text-2xl font-bold">TomasMendelek</h1>
              <div className="flex gap-2">
                <Button>Edit Profile</Button>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex justify-center md:justify-start space-x-6 mb-4">
              <div>
                <span className="font-bold">1,234</span> posts
              </div>
              <div>
                <span className="font-bold">4,567</span> followers
              </div>
              <div>
                <span className="font-bold">890</span> following
              </div>
            </div>
            <div>
              <p className="font-medium">@Mendelek</p>
              <p className="text-muted-foreground">
                
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="posts">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="posts">
            <Grid3X3 className="h-4 w-4 mr-2" />
            Posts
          </TabsTrigger>
          <TabsTrigger value="saved">
            <ImageIcon className="h-4 w-4 mr-2" />
            Saved
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <div className="grid grid-cols-3 gap-1">
            {posts.map((post) => (
              <div
                key={post.id}
                className="aspect-square relative group cursor-pointer"
              >
                <Image
                fill
                  src={post.image}
                  alt="Post"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-white flex items-center space-x-4">
                    <div className="flex items-center">
                      <Heart className="h-6 w-6 mr-2" />
                      <span>{post.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-6 w-6 mr-2" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="saved">
          <div className="text-center text-muted-foreground py-8">
            No saved posts yet
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
