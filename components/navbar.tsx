"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Home,
  Search,
  PlusSquare,
  Heart,
  MessageCircle,
  Bell,
  User,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="flex items-center justify-between h-16 px-4 max-w-7xl mx-auto">
        <Link href="/" className="text-xl font-bold">
          Fivy
        </Link>

        <div className="hidden md:flex items-center space-x-4 flex-1 max-w-xs mx-8">
          <Input
            type="search"
            placeholder="Search..."
            className="w-full"
          />
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className={isActive("/") ? "bg-accent" : ""}>
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          
          <Link href="/messages">
            <Button variant="ghost" size="icon" className={isActive("/messages") ? "bg-accent" : ""}>
              <MessageCircle className="h-5 w-5" />
            </Button>
          </Link>

          <Link href="/create">
            <Button variant="ghost" size="icon" className={isActive("/create") ? "bg-accent" : ""}>
              <PlusSquare className="h-5 w-5" />
            </Button>
          </Link>

          <Link href="/notifications">
            <Button variant="ghost" size="icon" className={isActive("/notifications") ? "bg-accent" : ""}>
              <Bell className="h-5 w-5" />
            </Button>
          </Link>

          <Link href="/profile">
            <Button variant="ghost" size="icon" className={isActive("/profile") ? "bg-accent" : ""}>
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}