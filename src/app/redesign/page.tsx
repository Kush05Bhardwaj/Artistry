"use client"

import * as React from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ComparisonSlider } from "./comparison-slider";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Loader } from "lucide-react";
import Link from 'next/link';
import { generateRedesignedImage } from '@/ai/flows/generate-redesigned-image';

function RedesignGenerator() {
  const searchParams = useSearchParams();
  const [originalImage, setOriginalImage] = React.useState<string | null>(null);
  const suggestionsParam = searchParams.getAll('suggestions');
  const suggestions = Array.isArray(suggestionsParam) ? suggestionsParam : (suggestionsParam ? [suggestionsParam] : []);
  const roomType = searchParams.get('roomType');

  const [redesignedImage, setRedesignedImage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const storedImage = sessionStorage.getItem('originalImageDataUri');
    setOriginalImage(storedImage);
    
    if (storedImage && suggestions.length > 0) {
      generateRedesignedImage({ photoDataUri: storedImage, suggestions: suggestions.flat(), roomType: roomType || undefined })
        .then(result => {
            setRedesignedImage(result.photoDataUri)
        })
        .catch(err => {
            console.error(err);
            if (err instanceof Error && err.message.includes('429')) {
              setError('You have exceeded the daily limit for image redesigns. Please try again tomorrow.');
            } else {
              setError('Failed to generate redesigned image.');
            }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
        setIsLoading(false);
        if (!storedImage) {
          setError('Original image not found. Please go back and upload an image first.');
        }
    }
  }, [suggestions, roomType]);


  if (isLoading) {
      return (
        <div className="text-center space-y-4">
            <Loader className="w-12 h-12 mx-auto text-primary animate-spin" />
            <h3 className="text-lg font-semibold">Generating your redesigned room...</h3>
            <p className="text-muted-foreground">This may take a few moments.</p>
        </div>
      )
  }
  
  if (error) {
    return (
        <div className="text-center space-y-4 text-destructive p-4 border border-destructive/50 bg-destructive/10 rounded-md">
            <h3 className="text-lg font-semibold">An Error Occurred</h3>
            <p>{error}</p>
            {error.includes('Original image not found') && <Button asChild className="mt-4"><Link href="/design">Go Back</Link></Button>}
        </div>
    )
  }
  
  if (!redesignedImage || !originalImage) {
      return (
        <div className="text-center space-y-4">
            <Loader className="w-12 h-12 mx-auto text-primary animate-spin" />
            <h3 className="text-lg font-semibold">Preparing your redesigned room...</h3>
            <p className="text-muted-foreground">The AI is working its magic.</p>
        </div>
      )
  }

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <ComparisonSlider
          before={originalImage}
          after={redesignedImage}
          beforeHint="living room before"
          afterHint="living room after"
        />
      </div>

       <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button size="lg" asChild>
          <Link href="/products">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Shop This Look
          </Link>
        </Button>
        <Button size="lg" variant="secondary">
          <Heart className="mr-2 h-5 w-5" />
          Save Design
        </Button>
      </div>
    </>
  )
}


export default function RedesignPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-4xl font-bold">Your AI Redesign</h1>
        <p className="text-lg text-muted-foreground">
          Slide to see the transformation.
        </p>
      </div>
      
       <Suspense fallback={
        <div className="text-center space-y-4">
          <Loader className="w-12 h-12 mx-auto text-primary animate-spin" />
          <h3 className="text-lg font-semibold">Loading your redesigned room...</h3>
          <p className="text-muted-foreground">This may take a few moments.</p>
        </div>
      }>
        <RedesignGenerator />
      </Suspense>

    </div>
  );
}
