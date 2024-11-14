'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import Image from 'next/image';

export function Feed() {
  const [posts] = useState([
    {
      id: 1,
      user: {
        name: 'TomasMende',
        username: 'Mendelek',
        avatar: 'https://avatars.githubusercontent.com/u/143723168?v=4',
      },
      image:
        'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      likes: 1234,
      caption: 'Test123',
      comments: 45,
    },
    {
      id: 2,
      user: {
        name: 'JereRG',
        username: 'JeremiasGuzman',
        avatar: 'https://avatars.githubusercontent.com/u/138630815?v=4',
      },
      image:
        'https://images.unsplash.com/photo-1682687221248-3116ba6ab483?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      likes: 2345,
      caption: 'Test123',
      comments: 89,
    },
  ]);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <div className="p-4 flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <Image
                fill
                src={post.user.avatar}
                alt={post.user.name}
                className="object-cover"
              />
            </Avatar>
            <div>
              <p className="font-semibold">{post.user.name}</p>
              <p className="text-sm text-muted-foreground">
                @{post.user.username}
              </p>
            </div>
          </div>

          <div className="aspect-square relative">
            <Image
              fill
              src={post.image}
              alt="Post"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Heart className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageCircle className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-6 w-6" />
                </Button>
              </div>
              <Button variant="ghost" size="icon">
                <Bookmark className="h-6 w-6" />
              </Button>
            </div>

            <p className="font-semibold">{post.likes.toLocaleString()} likes</p>
            <p>
              <span className="font-semibold">{post.user.username}</span>{' '}
              {post.caption}
            </p>
            <p className="text-sm text-muted-foreground">
              View all {post.comments} comments
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
