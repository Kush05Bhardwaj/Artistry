import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import Image from 'next/image';
import { Paintbrush, ShoppingBag, Wallet, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { Suspense } from 'react';
import { ProductCardSkeleton, TestimonialCardSkeleton } from '@/components/ui/loading-states';

// Lazy load components for better performance
const ContactForm = () => {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-2xl">Contact Us</CardTitle>
        <CardDescription>We'll get back to you as soon as possible.</CardDescription>
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
        <Button className="w-full">
          Send Message
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

const testimonials = [
  {
    name: 'Priya Sharma',
    city: 'Pune',
    avatar: 'PS',
    image: '/user.jpg',
    dataAiHint: 'woman portrait',
    text: 'Artistry AI helped me visualize my dream living room! The suggestions were spot on with my taste. The process was so simple and affordable.',
    rating: 5,
  },
  {
    name: 'Amit Kumar',
    city: 'Jaipur',
    avatar: 'AK',
    image: '/user.jpg',
    dataAiHint: 'man portrait',
    text: "I was skeptical about DIY design, but this platform made it incredibly easy. I found the perfect furniture for my small apartment without any hassle.",
    rating: 5,
  },
  {
    name: 'Sunita Devi',
    city: 'Lucknow',
    avatar: 'SD',
    image: '/user.jpg',
    dataAiHint: 'woman smiling',
    text: 'A fantastic tool for anyone on a budget. I managed to redesign my entire kitchen and saved a lot compared to hiring a professional designer.',
    rating: 5,
  },
];

const brands = [
  { name: 'Urban Ladder', logo: '/1.jpg', dataAiHint: 'logo furniture' },
  { name: 'Asian Paints', logo: '/2.png', dataAiHint: 'logo paint' },
  { name: 'Pepperfry', logo: '/3.jpg', dataAiHint: 'logo home' },
  { name: 'Jaquar', logo: '/4.png', dataAiHint: 'logo bathroom' },
  { name: 'Fabindia', logo: '/5.png', dataAiHint: 'logo ethnic' },
];

const features = [
  {
    icon: Paintbrush,
    title: 'AI Design',
    description: 'Upload a photo of your room and get instant, personalized design suggestions from our AI.',
    benefits: ['Instant analysis', 'Personalized recommendations', 'Style matching']
  },
  {
    icon: ShoppingBag,
    title: 'Product Matching',
    description: 'Shop the look with curated products that match your new design and budget, all in one place.',
    benefits: ['Curated selection', 'Budget-friendly options', 'One-click shopping']
  },
  {
    icon: Wallet,
    title: 'Save Costs',
    description: 'Get professional-level design without the high cost. Perfect for the savvy Indian homeowner.',
    benefits: ['90% cost savings', 'No designer fees', 'DIY approach']
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-accent py-20 md:py-32">
        <div className="container mx-auto grid grid-cols-1 items-center gap-8 text-center md:grid-cols-2 md:text-left">
          <div className="space-y-6">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl lg:text-6xl">
              Redesign your room with AI.
            </h1>
            <p className="text-lg text-foreground/80 md:text-xl">
              Fast. Affordable. DIY. Your dream home is just a photo away.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
              <Button asChild size="lg">
                <Link href="/design">
                  Upload Your Room
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/design">Try Demo</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground md:justify-start">
              
            </div>
          </div>
          <div className="relative h-64 w-full overflow-hidden rounded-lg shadow-xl md:h-96">
            <Image
              src="/room.jpg"
              alt="Beautifully designed bedroom with modern furniture and warm lighting"
              fill
              priority
              unoptimized
              className="object-cover"
              data-ai-hint="bed room interior"
            />
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
            <p className="max-w-[700px] text-foreground/70 md:text-xl">
              Transform your space in three simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={feature.title} className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <feature.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-headline text-2xl font-bold">{index + 1}. {feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="w-full bg-accent py-16 md:py-24">
        <div className="container mx-auto space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">What Our Users Say</h2>
            <p className="max-w-[700px] text-foreground/70 md:text-xl">
              Trusted by families across India to build their dream homes.
            </p>
          </div>
          <Suspense fallback={
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <TestimonialCardSkeleton key={i} />
              ))}
            </div>
          }>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="bg-background">
                  <CardContent className="flex flex-col items-center pt-6 text-center">
                    <Avatar className="mb-4 h-20 w-20">
                      <AvatarImage src={testimonial.image} data-ai-hint={testimonial.dataAiHint} />
                      <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                    <p className="mb-4 text-foreground/80">"{testimonial.text}"</p>
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="mt-4 font-bold">{testimonial.name}</p>
                    <p className="text-sm text-foreground/60">{testimonial.city}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Suspense>
        </div>
      </section>

      {/* Brands Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto text-center">
          <h2 className="mb-8 font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Our Trusted Brands</h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {brands.map((brand) => (
              <div key={brand.name} className="grayscale transition-all hover:grayscale-0">
                <Image 
                  src={brand.logo} 
                  alt={`${brand.name} logo`} 
                  width={150} 
                  height={50} 
                  data-ai-hint={brand.dataAiHint}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full bg-accent py-16 md:py-24">
        <div className="container mx-auto space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Get In Touch</h2>
            <p className="max-w-[700px] text-foreground/70 md:text-xl">
              Have questions? We'd love to hear from you. Drop us a message below.
            </p>
          </div>
          <div className="flex justify-center">
            <Suspense fallback={<div>Loading contact form...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
