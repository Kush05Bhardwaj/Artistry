"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { UploadCloud, Loader, Sparkles, Wand2, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getSuggestions } from "./action";
import type { GenerateDecorSuggestionsOutput } from "@/ai/flows/generate-decor-suggestions";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { validateFile, compressImage } from "@/lib/validation";
import { AIProcessingLoader, ImageUploadLoader } from "@/components/ui/loading-states";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  photo: z.any().refine((files) => files?.length === 1, "Please upload a photo of your room."),
  roomType: z.string().optional(),
  roomSize: z.string().optional(),
  style: z.string().optional(),
  budget: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function DesignForm() {
  const [isPending, startTransition] = useTransition();
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<GenerateDecorSuggestionsOutput | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      roomType: "living_room", 
      roomSize: "medium",
      style: "modern",
      budget: "medium"
    },
  });

  const handleFileChange = async (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      setUploadError(null);
      
      // Validate file
      const validation = validateFile(file);
      if (!validation.valid) {
        setUploadError(validation.error);
        return;
      }

      setIsProcessingImage(true);
      
      try {
        // Compress image for better performance
        const compressedFile = await compressImage(file);
        form.setValue("photo", [compressedFile]);
        
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setPreview(result);
          sessionStorage.setItem('originalImageDataUri', result);
          setIsProcessingImage(false);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        setUploadError("Failed to process image. Please try again.");
        setIsProcessingImage(false);
      }
    }
  };
  
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
  
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFileChange(files);
  };

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append("photo", data.photo[0]);
    if (data.roomType) formData.append("roomType", data.roomType);
    if (data.roomSize) formData.append("roomSize", data.roomSize);
    if (data.style) formData.append("style", data.style);
    if (data.budget) formData.append("budget", data.budget);
    
    setSuggestions(null);

    startTransition(async () => {
      try {
        const result = await getSuggestions(formData);
        if (result.error) {
          toast({
            variant: "destructive",
            title: "An error occurred",
            description: result.error,
          });
        } else if (result.data) {
          setSuggestions(result.data);
          toast({
            title: "Success!",
            description: "AI suggestions generated successfully.",
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Network Error",
          description: "Please check your connection and try again.",
        });
      }
    });
  };

  const handleSeeRedesign = () => {
    if (!suggestions) return;
    const params = new URLSearchParams();
    suggestions.suggestions.forEach(s => params.append('suggestions', s));
    params.set('roomType', form.getValues('roomType') || '');
    params.set('style', form.getValues('style') || '');
    router.push(`/redesign?${params.toString()}`);
  }

  return (
    <>
      <Card>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Room Details</CardTitle>
            <CardDescription>
              Upload a photo and provide some details about your room for personalized AI suggestions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Room Photo</Label>
              <div 
                className={`
                  relative flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                  ${uploadError ? 'border-destructive bg-destructive/5' : 'border-muted-foreground/25 hover:bg-accent/50'}
                  ${isProcessingImage ? 'pointer-events-none opacity-50' : ''}
                `}
                onDragOver={onDragOver}
                onDrop={onDrop}
              >
                <Input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files)}
                  disabled={isProcessingImage}
                />
                {isProcessingImage ? (
                  <ImageUploadLoader />
                ) : preview ? (
                  <div className="space-y-4 text-center">
                    <Image
                      src={preview}
                      alt="Room preview"
                      width={200}
                      height={200}
                      className="object-contain rounded-md mx-auto"
                    />
                    <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>Image uploaded successfully</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <UploadCloud className="w-12 h-12 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, WEBP (max 10MB)</p>
                  </div>
                )}
              </div>
              
              {uploadError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{uploadError}</AlertDescription>
                </Alert>
              )}
              
              {form.formState.errors.photo && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{form.formState.errors.photo.message as string}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="roomType">Room Type</Label>
                <Select onValueChange={(value) => form.setValue("roomType", value)} defaultValue="living_room">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="living_room">Living Room</SelectItem>
                    <SelectItem value="bedroom">Bedroom</SelectItem>
                    <SelectItem value="kitchen">Kitchen</SelectItem>
                    <SelectItem value="bathroom">Bathroom</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="roomSize">Room Size</Label>
                <Select onValueChange={(value) => form.setValue("roomSize", value)} defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a room size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="style">Preferred Style</Label>
                <Select onValueChange={(value) => form.setValue("style", value)} defaultValue="modern">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="traditional">Traditional</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                    <SelectItem value="bohemian">Bohemian</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range</Label>
                <Select onValueChange={(value) => form.setValue("budget", value)} defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (Rs. 10K - Rs. 50K)</SelectItem>
                    <SelectItem value="medium">Medium (Rs. 50K - Rs. 2L)</SelectItem>
                    <SelectItem value="high">High (Rs. 2L+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isPending || isProcessingImage}>
              {isPending ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Room...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Start AI Design
                </>
              )}
            </Button>
          </CardContent>
        </form>
      </Card>

      {isPending && (
        <Card className="mt-8">
          <CardContent className="p-0">
            <AIProcessingLoader message="Our AI is analyzing your room and generating personalized suggestions..." />
          </CardContent>
        </Card>
      )}

      {suggestions && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-3xl">
              <Sparkles className="w-8 h-8 text-primary" />
              AI Suggestions
            </CardTitle>
            <CardDescription>
              Here are some ideas to enhance your space based on your preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div>
              <h3 className="font-semibold mb-2">Detected Items:</h3>
              <div className="flex flex-wrap gap-2">
                {suggestions.detectedItems.map((item, index) => (
                  <Badge key={index} variant="secondary">{item}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Recommendations:</h3>
              <ul className="space-y-2 list-disc list-inside text-foreground/90">
                {suggestions.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
            <div className="flex gap-4 pt-4">
                <Button onClick={handleSeeRedesign} className="w-full">
                  See AI Redesign
                </Button>
                <Button variant="secondary" className="w-full">Save Design</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
} 