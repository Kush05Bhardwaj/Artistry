"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ComparisonSlider } from "@/app/redesign/comparison-slider";
import { Loader2, LogOut, Clock, Image as ImageIcon, Eye, Receipt } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getUserDesignsAction } from "./action";
import type { GenerateCostEstimateOutput } from "@/ai/flows/generate-cost-estimate";

// Placeholder for future design history fetching from MongoDB
interface UserDesign {
  id: string;
  originalImage: string;
  generatedImage?: string;
  roomType?: string;
  style?: string;
  suggestions?: string[];
  costEstimate?: GenerateCostEstimateOutput;
  createdAt: string;
}

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [designs, setDesigns] = useState<UserDesign[]>([]);
  const [isLoadingDesigns, setIsLoadingDesigns] = useState(true);

  useEffect(() => {
    // Redirect if unauthenticated
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        setIsLoadingDesigns(true);
        const result = await getUserDesignsAction();
        if (result.designs) {
          setDesigns(result.designs);
        } else {
          console.error("Error fetching designs:", result.error);
        }
      } catch (error) {
        console.error("Error fetching designs:", error);
      } finally {
        setIsLoadingDesigns(false);
      }
    };

    if (user) {
      fetchDesigns();
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="container py-10 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">My Account</h1>
        <p className="text-muted-foreground">Manage your profile and view your generated designs.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        {/* Profile Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.displayName || user.email}`} />
                  <AvatarFallback className="text-2xl">{(user.displayName || user.email || "U").charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl">{user.displayName}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Member since:</span>
                  <span className="ml-auto font-medium">Just now</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" className="w-full" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Designs Gallery */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Design History</h2>
            <Button variant="outline" onClick={() => router.push('/design')}>
              <ImageIcon className="w-4 h-4 mr-2" />
              New Design
            </Button>
          </div>

          {isLoadingDesigns ? (
            <Card className="flex h-64 items-center justify-center">
               <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </Card>
          ) : designs.length === 0 ? (
            <Card className="flex flex-col h-64 items-center justify-center text-center p-8 border-dashed">
              <ImageIcon className="w-12 h-12 text-muted-foreground mb-4 opacity-20" />
              <h3 className="text-lg font-medium mb-1">No designs yet</h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                You haven't generated any interior designs yet. Head over to the design studio to create your first masterpiece!
              </p>
              <Button onClick={() => router.push('/design')}>Get Started</Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {designs.map((design) => (
                <Card key={design.id} className="overflow-hidden">
                   <div className="relative aspect-video">
                     <Image 
                        src={design.generatedImage || design.originalImage} 
                        alt={`${design.roomType || 'Room'} in ${design.style || 'Custom'} style`}
                        fill
                        className="object-cover"
                     />
                   </div>
                   <CardContent className="p-4">
                     <div className="flex justify-between items-start mb-2">
                       <div>
                         <p className="font-medium capitalize">{design.roomType || 'Room'} • {design.style || 'Custom'} Style</p>
                         <p className="text-xs text-muted-foreground mt-1">
                           {design.generatedImage ? "AI Redesign" : "AI Suggestions"}
                         </p>
                       </div>
                       <span className="text-xs text-muted-foreground">
                         {new Date(design.createdAt).toLocaleDateString()}
                       </span>
                     </div>
                     {((design as any).suggestions && (design as any).suggestions.length > 0) && (
                       <div className="mt-4 border-t pt-2 max-h-32 overflow-y-auto">
                         <p className="text-xs font-semibold mb-1">Suggestions:</p>
                         <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                           {((design as any).suggestions as string[]).map((s, i) => (
                             <li key={i}>{s}</li>
                           ))}
                         </ul>
                       </div>
                     )}

                     <div className="mt-4 pt-2">
                       <Dialog>
                         <DialogTrigger asChild>
                           <Button variant="secondary" className="w-full" size="sm">
                             <Eye className="w-4 h-4 mr-2" />
                             View Details
                           </Button>
                         </DialogTrigger>
                         <DialogContent className="max-w-[90vw] md:max-w-4xl h-[90vh] overflow-y-auto">
                           <DialogHeader>
                             <DialogTitle className="capitalize">{design.roomType || 'Room'} • {design.style || 'Custom'} Style</DialogTitle>
                           </DialogHeader>
                           <div className="space-y-6 mt-4">
                             {design.generatedImage ? (
                               <div className="w-full">
                                 <ComparisonSlider
                                   before={design.originalImage}
                                   after={design.generatedImage}
                                   beforeHint="Original"
                                   afterHint="Redesigned"
                                 />
                               </div>
                             ) : (
                               <div className="relative aspect-video w-full">
                                 <Image 
                                   src={design.originalImage} 
                                   alt="Original Room"
                                   fill
                                   className="object-contain rounded-md"
                                 />
                               </div>
                             )}

                             {((design as any).suggestions && (design as any).suggestions.length > 0) && (
                               <div className="bg-muted p-4 rounded-lg">
                                 <h4 className="font-semibold mb-2">AI Recommendations</h4>
                                 <ul className="text-sm list-disc pl-5 space-y-1">
                                   {((design as any).suggestions as string[]).map((s, i) => (
                                     <li key={i}>{s}</li>
                                   ))}
                                 </ul>
                               </div>
                             )}
                           </div>

                             {design.costEstimate && (
                               <div className="bg-card p-6 rounded-lg shadow-sm border border-border mt-6">
                                 <div className="flex items-center gap-2 mb-4">
                                   <Receipt className="w-6 h-6 text-primary" />
                                   <h2 className="text-xl font-semibold">Estimated Cost of Upgrades</h2>
                                 </div>
                                 <p className="text-sm text-muted-foreground mb-6">{design.costEstimate.summary}</p>
                                 <div className="space-y-4">
                                   {design.costEstimate.items.map((item, i) => (
                                     <div key={i} className="flex justify-between items-start border-b border-border/50 pb-4 last:border-0 last:pb-0">
                                       <div>
                                         <h4 className="font-medium text-sm">{item.item}</h4>
                                         <p className="text-xs text-muted-foreground">{item.reason}</p>
                                       </div>
                                       <div className="text-sm font-medium whitespace-nowrap min-w-[80px] text-right">
                                         Rs. {item.estimatedCost.toLocaleString('en-IN')}
                                       </div>
                                     </div>
                                   ))}
                                 </div>
                                 <div className="mt-4 pt-3 border-t border-border flex justify-between items-center">
                                   <h4 className="font-bold">Total Estimate</h4>
                                   <span className="text-lg font-bold text-primary">Rs. {design.costEstimate.totalCostRaw.toLocaleString('en-IN')}</span>
                                 </div>
                               </div>
                             )}

                         </DialogContent>
                       </Dialog>
                     </div>
                   </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}