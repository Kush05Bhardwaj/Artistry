"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, Brush, LogOut, User as UserIcon, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

const navLinks = [
  { href: '/design', label: 'AI Design' },
  { href: '/about', label: 'About' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Brush className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">Artistry AI</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Link href="/" className="mb-8 flex items-center" onClick={() => setIsOpen(false)}>
                  <Brush className="h-6 w-6 text-primary" />
                  <span className="ml-2 font-bold font-headline">Artistry AI</span>
                </Link>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          
          <Link href="/" className="flex items-center space-x-2 md:hidden">
            <Brush className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">Artistry AI</span>
          </Link>

          <div className="flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                       <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.displayName || user.email}`} alt={user.displayName || user.email || "User"} />
                       <AvatarFallback>{(user.displayName || user.email || 'U').charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="flex items-center w-full cursor-pointer">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Account</span>
                    </Link>
                  </DropdownMenuItem>
                    {["kush2012bhardwaj@gmail.com", "agaur2813@gmail.com"].includes(user.email || "") && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center w-full cursor-pointer text-amber-600">
                        <ShieldAlert className="mr-2 h-4 w-4" />
                        <span>Admin Panel</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-500 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
                <div className="flex items-center gap-2 hidden md:flex">
                  <Link href="/login">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link href="/login?tab=register">
                     <Button>Get Started</Button>
                  </Link>
                </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
