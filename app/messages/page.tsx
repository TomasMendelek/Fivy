'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Search, Send } from 'lucide-react';

export default function MessagesPage() {
  const [conversations] = useState([
    {
      id: 1,
      user: {
        name: 'TomasMende',
        avatar: 'https://avatars.githubusercontent.com/u/143723168?v=4',
        lastMessage: 'Buenas Como estas',
        lastMessageTime: '2h ago',
        online: true,
      },
    },
    {
      id: 2,
      user: {
        name: 'JereRG',
        avatar: 'https://avatars.githubusercontent.com/u/138630815?v=4',
        lastMessage: 'Que onda',
        lastMessageTime: '1d ago',
        online: false,
      },
    },
  ]);

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 p-4">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-9" />
            </div>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="space-y-4">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="flex items-center space-x-4 p-2 rounded-lg hover:bg-accent cursor-pointer"
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <img
                          src={conversation.user.avatar}
                          alt={conversation.user.name}
                        />
                      </Avatar>
                      {conversation.user.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{conversation.user.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.user.lastMessage}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {conversation.user.lastMessageTime}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Card>

        <Card className="md:col-span-2 p-4 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="text-center text-muted-foreground py-8">
              Select a conversation to start messaging
            </div>
          </div>
          <div className="border-t pt-4 mt-4">
            <div className="flex space-x-2">
              <Input placeholder="Type a message..." className="flex-1" />
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
