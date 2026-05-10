"use client";

import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { UploadCloud, Sparkles, Wand2, RotateCcw, Download, Heart, Share2, Maximize2, Loader2, CheckCircle2, X, ChevronRight, Lightbulb, Sliders, Palette, Home, Sun, Sofa, Armchair } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getSuggestions } from "./action";
import { generateRedesignedImage } from "@/ai/flows/generate-redesigned-image";
import Link from "next/link";

const ROOM_TYPES = [
  { id: "living_room", label: "Living Room", icon: <Sofa className="w-5 h-5" /> },
  { id: "bedroom", label: "Bedroom", icon: <Home className="w-5 h-5" /> },
  { id: "kitchen", label: "Kitchen", icon: <Armchair className="w-5 h-5" /> },
  { id: "bathroom", label: "Bathroom", icon: <Home className="w-5 h-5" /> },
  { id: "office", label: "Home Office", icon: <Lightbulb className="w-5 h-5" /> },
];

const STYLES = [
  { id: "modern", label: "Modern", gradient: "from-blue-500 to-cyan-400", preview: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=200" },
  { id: "minimal", label: "Minimal", gradient: "from-gray-400 to-gray-200", preview: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200" },
  { id: "scandinavian", label: "Scandinavian", gradient: "from-white to-blue-200", preview: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=200" },
  { id: "japandi", label: "Japandi", gradient: "from-amber-200 to-stone-300", preview: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200" },
  { id: "luxury", label: "Luxury", gradient: "from-yellow-600 to-amber-400", preview: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=200" },
  { id: "industrial", label: "Industrial", gradient: "from-stone-600 to-stone-400", preview: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200" },
  { id: "boho", label: "Bohemian", gradient: "from-orange-400 to-rose-300", preview: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=200" },
  { id: "dark", label: "Dark Academia", gradient: "from-stone-800 to-stone-600", preview: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=200" },
];

const AI_STAGES = [
  { id: 1, label: "Analyzing room layout", progress: 20 },
  { id: 2, label: "Detecting furniture & walls", progress: 40 },
  { id: 3, label: "Understanding lighting", progress: 60 },
  { id: 4, label: "Creating redesign concept", progress: 80 },
  { id: 5, label: "Rendering final result", progress: 100 },
];

export default function DesignPage() {
  return (
    <div className="min-h-screen">
      <AIStudioSection />
    </div>
  );
}


function AIStudioSection() {
  const [image, setImage] = useState<string | null>(null);
  const [roomType, setRoomType] = useState("living_room");
  const [style, setStyle] = useState("modern");
  const [budget, setBudget] = useState([50]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStage, setGenerationStage] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        sessionStorage.setItem('originalImageDataUri', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!image) return;
    setIsGenerating(true);
    setGenerationStage(0);
    setError(null);

    for (let i = 0; i < AI_STAGES.length; i++) {
      setGenerationStage(i);
      await new Promise(r => setTimeout(r, 1500));
    }

    try {
      const roomTypeLabel = ROOM_TYPES.find(r => r.id === roomType)?.label || 'room';
      const suggestionsData = [`Modern ${style} interior design`, `Warm ambient lighting`, `Minimal furniture arrangement`, `Natural color palette`];

      const generated = await generateRedesignedImage({
        photoDataUri: image,
        suggestions: suggestionsData,
        roomType: roomTypeLabel,
        style: style,
      });

      setResult(generated.photoDataUri);
      sessionStorage.setItem('redesignedImage', generated.photoDataUri);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Upload Studio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden border-0 shadow-2xl">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <UploadCloud className="w-6 h-6 text-primary" />
                  Upload Your Room
                </h2>
                <p className="text-muted-foreground text-sm">Upload a photo of your room to get started</p>
              </div>
              <CardContent className="p-6">
                {!image ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative aspect-[4/3] rounded-2xl border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-all cursor-pointer group overflow-hidden"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-muted/50 to-muted/20 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                        <UploadCloud className="w-10 h-10 text-primary" />
                      </div>
                      <p className="text-lg font-medium mb-2">Drop your room photo here</p>
                      <p className="text-sm text-muted-foreground">or click to browse</p>
                      <p className="text-xs text-muted-foreground mt-4">Supports JPG, PNG, WEBP (max 10MB)</p>
                    </div>
                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-2xl pointer-events-none">
                      <div className="absolute inset-0 border-2 border-dashed border-primary/0 group-hover:border-primary/30 rounded-2xl animate-pulse" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                      <Image src={image} alt="Uploaded room" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all">
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                          <Button variant="secondary" size="sm" onClick={() => { setImage(null); fileInputRef.current?.click(); }}>
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Change Image
                          </Button>
                        </div>
                      </div>
                    </div>

                    {suggestions && (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mb-1" />
                          <p className="text-xs text-green-500 font-medium">Detected Room</p>
                          <p className="text-sm font-medium">{suggestions.detectedRoom || "Living Room"}</p>
                        </div>
                        <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                          <Sun className="w-4 h-4 text-amber-500 mb-1" />
                          <p className="text-xs text-amber-500 font-medium">Lighting</p>
                          <p className="text-sm font-medium">{suggestions.lighting || "Natural Light"}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Panel - AI Configuration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-0 shadow-2xl">
              <div className="bg-gradient-to-br from-secondary/10 to-primary/10 p-6">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Sliders className="w-6 h-6 text-secondary" />
                  AI Configuration
                </h2>
                <p className="text-muted-foreground text-sm">Customize your redesign preferences</p>
              </div>
              <CardContent className="p-6 space-y-8">
                {/* Room Type */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Room Type</label>
                  <div className="grid grid-cols-5 gap-2">
                    {ROOM_TYPES.map((room) => (
                      <button
                        key={room.id}
                        onClick={() => setRoomType(room.id)}
                        className={cn(
                          "p-3 rounded-xl border transition-all flex flex-col items-center gap-1",
                          roomType === room.id
                            ? "border-primary bg-primary/10 text-primary shadow-lg shadow-primary/20"
                            : "border-muted hover:border-primary/50 hover:bg-muted/50"
                        )}
                      >
                        {room.icon}
                        <span className="text-xs">{room.label.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style Selection */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Design Style</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {STYLES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setStyle(s.id)}
                        className={cn(
                          "relative rounded-xl overflow-hidden transition-all group",
                          style === s.id
                            ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105 shadow-lg"
                            : "hover:scale-105 hover:shadow-md"
                        )}
                      >
                        <Image src={s.preview} alt={s.label} width={120} height={80} className="w-full h-20 object-cover" />
                        <div className={cn("absolute inset-0 bg-gradient-to-t opacity-60", s.gradient)} />
                        <div className="absolute inset-0 flex items-end p-2">
                          <span className="text-xs font-medium text-white drop-shadow">{s.label}</span>
                        </div>
                        {style === s.id && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Slider */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium">Budget Range</label>
                    <Badge variant="outline" className="bg-primary/10">
                      {budget[0] < 33 ? "Budget-Friendly" : budget[0] < 66 ? "Mid-Range" : "Premium"}
                    </Badge>
                  </div>
                  <Slider value={budget} onValueChange={setBudget} max={100} step={1} className="my-6" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Low Cost</span>
                    <span>Premium</span>
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  size="lg"
                  className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                  onClick={handleGenerate}
                  disabled={!image || isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate AI Redesign
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Generation Progress */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">AI is designing your room...</h3>
                      <p className="text-muted-foreground text-sm">This may take a few moments</p>
                    </div>
                  </div>

                  <Progress value={AI_STAGES[generationStage]?.progress || 0} className="h-2 rounded-full mb-6" />

                  <div className="space-y-3">
                    {AI_STAGES.map((stage, i) => (
                      <div key={stage.id} className={cn(
                        "flex items-center gap-3 transition-all",
                        i < generationStage && "text-green-500",
                        i === generationStage && "text-primary font-medium",
                        i > generationStage && "text-muted-foreground"
                      )}>
                        {i < generationStage ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : i === generationStage ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2" />
                        )}
                        <span>{stage.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-8"
            >
              <Card className="border-0 shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-secondary p-1">
                  <div className="bg-background p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-primary" />
                        Your AI Redesign
                      </h3>
                      <div className="flex gap-2">
                        <Button size="icon" variant="outline"><Maximize2 className="w-4 h-4" /></Button>
                        <Button size="icon" variant="outline"><Share2 className="w-4 h-4" /></Button>
                        <Button size="icon" variant="outline"><Download className="w-4 h-4" /></Button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground font-medium">Original</p>
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                          <Image src={image!} alt="Original" fill className="object-cover" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground font-medium">Redesigned</p>
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                          <Image src={result} alt="Redesigned" fill className="object-cover" />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <Button variant="outline" className="flex-1">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Regenerate
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Heart className="w-4 h-4 mr-2" />
                        Save Design
                      </Button>
                      <Link href="/products" className="flex-1">
                        <Button className="w-full">
                          Shop This Look
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}


