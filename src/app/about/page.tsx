import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h1 className="font-headline text-4xl font-bold">Our Vision</h1>
          <p className="text-xl text-muted-foreground">
            Making good design accessible to every middle-class family in India.
          </p>
          <p>
            At Artistry AI, we believe that a beautiful home isn't a luxury reserved for the few. It's a space where memories are made, families grow, and dreams take shape. Our mission is to empower you with the tools and inspiration to create a home you love, regardless of your budget or design experience.
          </p>
           <p>
            We're a team of designers, engineers, and dreamers from Tier-2 and Tier-3 cities, just like many of our users. We understand the unique aspirations and challenges of the modern Indian household. By combining cutting-edge AI with a deep appreciation for our culture and aesthetics, we're making interior design simple, affordable, and truly DIY.
          </p>
        </div>
        <div className="relative w-full aspect-square overflow-hidden rounded-lg">
           <Image
            src="/logo.png"
            alt="Team of designers working together"
            fill
            className="object-cover"
            data-ai-hint="team meeting design"
          />
        </div>
      </div>

      <div className="mt-24 space-y-12">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl font-bold">The Story of Artistry</h2>
            <p className="mt-4 text-muted-foreground">
                At Artistry, we believe everyone deserves a beautiful home — not just the wealthy or the elite. Born out of a passion for design and powered by cutting-edge AI, Artistry was created to help students, renters, and middle-class families in India design their dream spaces — easily, affordably, and independently.
            </p>
            <p className="mt-4">
                Whether you're decorating a rented room or renovating a lifelong home, Artistry gives you the power to visualize, plan, and transform your space — all from your phone. With intelligent suggestions, a drag-and-drop design tool, product recommendations, and direct connections to vendors and designers, Artistry puts creative control back into your hands.
            </p>
            <p className="mt-4 font-semibold">
                We’re not just an app. We’re a movement to make interior design accessible for all — starting with India’s rising towns and cities.
            </p>
        </div>
      </div>

       <div className="mt-24">
         <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl">Get In Touch</CardTitle>
                <CardDescription>We'd love to hear from you. Drop us a message below or email us at agaur2813@gmail.com</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your Name" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Your Email" />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your message..." />
                </div>
                <Button className="w-full">Send Message</Button>
            </CardContent>
         </Card>
               </div>
     </div>
   );
}
