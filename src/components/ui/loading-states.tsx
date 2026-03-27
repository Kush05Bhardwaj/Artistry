"use client";

import { Skeleton } from './skeleton';
import { Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

// AI Processing Loading State
export function AIProcessingLoader({ message = "Our AI is analyzing your room..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
        <Sparkles className="absolute inset-0 m-auto h-6 w-6 animate-pulse text-primary" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{message}</h3>
        <p className="text-sm text-muted-foreground">
          This may take a few moments. Great design is on its way!
        </p>
      </div>
      <div className="flex space-x-1">
        <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 animate-bounce rounded-full bg-primary"></div>
      </div>
    </div>
  );
}

// Image Upload Loading State
export function ImageUploadLoader() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <div className="space-y-1">
        <p className="text-sm font-medium">Processing image...</p>
        <p className="text-xs text-muted-foreground">Optimizing for AI analysis</p>
      </div>
    </div>
  );
}

// Skeleton for Product Cards
export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <Skeleton className="aspect-square w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <div className="p-4 pt-0 flex gap-2">
        <Skeleton className="h-9 w-9" />
        <Skeleton className="h-9 flex-1" />
      </div>
    </div>
  );
}

// Skeleton for Testimonial Cards
export function TestimonialCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center space-x-4 mb-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

// Skeleton for Design Form
export function DesignFormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-48 w-full rounded-lg" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

// Progress Bar Component
export function ProgressBar({ 
  progress, 
  message, 
  className 
}: { 
  progress: number; 
  message?: string; 
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {message && (
        <p className="text-sm text-muted-foreground">{message}</p>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">{Math.round(progress)}%</p>
    </div>
  );
}

// Loading Spinner with different sizes
export function LoadingSpinner({ 
  size = "default", 
  className 
}: { 
  size?: "sm" | "default" | "lg"; 
  className?: string;
}) {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-8 w-8"
  };

  return (
    <Loader2 className={cn("animate-spin", sizeClasses[size], className)} />
  );
}

// Page Loading State
export function PageLoader({ 
  title = "Loading...", 
  description 
}: { 
  title?: string; 
  description?: string;
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
      <LoadingSpinner size="lg" />
      <div className="text-center space-y-1">
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
} 