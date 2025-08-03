import Link from 'next/link';
import { Brush, Twitter, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t bg-accent">
      <div className="container mx-auto grid grid-cols-2 gap-8 px-4 py-8 md:grid-cols-5">
        <div>
          <h3 className="mb-4 font-headline text-lg font-semibold">Artistry AI</h3>
          <Link href="/" className="flex items-center space-x-2 text-foreground/80">
            <Brush className="h-6 w-6 text-primary" />
            <span className="font-bold">Artistry AI</span>
          </Link>
        </div>
        <div>
          <h3 className="mb-4 font-headline text-lg font-semibold">Company</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="text-foreground/80 hover:text-primary">About Us</Link></li>
            <li><Link href="/rewards" className="text-foreground/80 hover:text-primary">Rewards</Link></li>
            <li><Link href="/login" className="text-foreground/80 hover:text-primary">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-headline text-lg font-semibold">Resources</h3>
          <ul className="space-y-2">
            <li><Link href="/products" className="text-foreground/80 hover:text-primary">Blog</Link></li>
            <li><Link href="/about" className="text-foreground/80 hover:text-primary">Contact</Link></li>
            <li><Link href="/estimator" className="text-foreground/80 hover:text-primary">FAQs</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-headline text-lg font-semibold">Contact</h3>
          <ul className="space-y-2">
            <li><a href="mailto:agaur2813@gmail.com" className="text-foreground/80 hover:text-primary">agaur2813@gmail.com</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-headline text-lg font-semibold">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="#" className="text-foreground/80 hover:text-primary"><Twitter /></Link>
            <Link href="#" className="text-foreground/80 hover:text-primary"><Instagram /></Link>
            <Link href="#" className="text-foreground/80 hover:text-primary"><Facebook /></Link>
          </div>
        </div>
      </div>
      <div className="border-t py-4">
        <p className="text-center text-sm text-foreground/60">
          © {new Date().getFullYear()} Artistry AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
