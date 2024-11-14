"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, MessageCircle, UserPlus } from "lucide-react";

export default function NotificationsPage() {
  const [notifications] = useState([
    {
      id: 1,
      type: "like",
      user: {
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      },
      content: "liked your post",
      time: "2h ago",
    },
    {
      id: 2,
      type: "comment",
      user: {
        name: "Jane Smith",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      },
      content: "commented on your post: 'This is amazing!'",
      time: "1d ago",
    },
    {
      id: 3,
      type: "follow",
      user: {
        name: "Mike Johnson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      },
      content: "started following you",
      time: "2d ago",
    },
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />;
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case "follow":
        return <UserPlus className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <Card>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Notifications</h1>
          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-accent"
                >
                  <Avatar className="h-10 w-10">
                    <img src={notification.user.avatar} alt={notification.user.name} />
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-semibold">{notification.user.name}</span>{" "}
                      {notification.content}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getNotificationIcon(notification.type)}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </Card>
    </div>
  );
}