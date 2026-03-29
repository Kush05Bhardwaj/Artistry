"use client"

import * as React from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ComparisonSlider } from "./comparison-slider";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Loader, Receipt, Sparkles } from "lucide-react";
import Link from 'next/link';
import { generateRedesignedImage } from '@/ai/flows/generate-redesigned-image';
import { getCostEstimate } from './action';
import type { GenerateCostEstimateOutput } from '@/ai/flows/generate-cost-estimate';

function RedesignGenerator() {
  const searchParams = useSearchParams();
  const [originalImage, setOriginalImage] = React.useState<string | null>(null);
  const suggestionsParam = searchParams.getAll('suggestions');
  const suggestions = Array.isArray(suggestionsParam) ? suggestionsParam : (suggestionsParam ? [suggestionsParam] : []);
  const roomType = searchParams.get('roomType');
  const style = searchParams.get('style');

  const [redesignedImage, setRedesignedImage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [costEstimate, setCostEstimate] = React.useState<GenerateCostEstimateOutput | null>(null);
  const [isEstimatingCost, setIsEstimatingCost] = React.useState(false);
  const hasGeneratedRef = React.useRef(false);

  React.useEffect(() => {
    if (hasGeneratedRef.current) return;

    const storedImage = sessionStorage.getItem('originalImageDataUri');
    setOriginalImage(storedImage);

    if (storedImage && suggestions.length > 0) {
      hasGeneratedRef.current = true;
      generateRedesignedImage({ photoDataUri: storedImage, suggestions: suggestions.flat(), roomType: roomType || undefined, style: style || undefined })
        .then(result => {
            setRedesignedImage(result.photoDataUri);
            setIsEstimatingCost(true);
            getCostEstimate({ originalPhotoDataUri: storedImage, redesignedPhotoDataUri: result.photoDataUri, roomType: roomType || undefined }).then(costRes => { if (costRes.data) setCostEstimate(costRes.data); }).finally(() => setIsEstimatingCost(false));
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

             {isEstimatingCost && (
        <div className="text-center space-y-4 mt-8">
            <Loader className="w-8 h-8 mx-auto text-primary animate-spin" />
            <h3 className="text-md font-semibold">Estimating costs for changes...</h3>
        </div>
      )}

      {costEstimate && (
        <div className="max-w-3xl mx-auto mt-12 bg-card p-6 rounded-lg shadow-sm border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Receipt className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold">Estimated Cost of Upgrades</h2>
          </div>
          <p className="text-muted-foreground mb-6">{costEstimate.summary}</p>
          <div className="space-y-4">
            {costEstimate.items.map((item, i) => (
              <div key={i} className="flex justify-between items-start border-b border-border/50 pb-4 last:border-0 last:pb-0">
                <div>
                  <h4 className="font-semibold">{item.item}</h4>
                  <p className="text-sm text-muted-foreground">{item.reason}</p>
                </div>
                <div className="font-medium whitespace-nowrap min-w-[100px] text-right">
                  ₹{item.estimatedCost.toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
            <h3 className="text-xl font-bold">Total Estimate</h3>
            <span className="text-xl font-bold text-primary">₹{costEstimate.totalCostRaw.toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}

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




