import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster"
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { AuthProvider } from '@/hooks/use-auth';
import { ErrorBoundary } from '@/components/ui/error-boundary';

export const metadata: Metadata = {
  title: {
    default: 'Artistry AI - Redesign Your Room with AI',
    template: '%s | Artistry AI'
  },
  description: 'Transform your living space with AI-powered interior design. Upload a photo and get instant, personalized design suggestions. Fast, affordable, and DIY-friendly.',
  keywords: [
    'AI interior design',
    'room redesign',
    'home decoration',
    'interior design app',
    'AI home design',
    'virtual room makeover',
    'interior design suggestions',
    'home improvement',
    'decorating ideas',
    'furniture placement'
  ],
  authors: [{ name: 'Artistry AI Team' }],
  creator: 'Artistry AI',
  publisher: 'Artistry AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Artistry AI - Redesign Your Room with AI',
    description: 'Transform your living space with AI-powered interior design. Upload a photo and get instant, personalized design suggestions.',
    siteName: 'Artistry AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Artistry AI - AI-Powered Interior Design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artistry AI - Redesign Your Room with AI',
    description: 'Transform your living space with AI-powered interior design.',
    images: ['/og-image.jpg'],
    creator: '@artistryai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Artistry AI",
              "description": "AI-powered interior design application",
              "url": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:9002",
              "applicationCategory": "DesignApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR"
              },
              "creator": {
                "@type": "Organization",
                "name": "Artistry AI"
              }
            })
          }}
        />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <ErrorBoundary>
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <WhatsAppButton />
            <Toaster />
          </AuthProvider>
        </ErrorBoundary>
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
