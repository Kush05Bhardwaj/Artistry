import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Gift, Share2, Star } from "lucide-react";

export default function RewardsPage() {
  return (
    <div className="bg-accent">
      <div className="container mx-auto py-12">
        <div className="space-y-4 text-center mb-12">
          <h1 className="font-headline text-4xl font-bold">Rewards & Referrals</h1>
          <p className="text-lg text-muted-foreground">
            Earn points, get rewards, and share the love of design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="text-primary" />
                Earn Points
              </CardTitle>
              <CardDescription>
                Complete tasks to earn points towards exclusive rewards.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-background rounded-md">
                <span>Try the AI Designer</span>
                <span className="font-bold text-primary">+50 Points</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-background rounded-md">
                <span>Save a design</span>
                <span className="font-bold text-primary">+20 Points</span>
              </div>
               <div className="flex justify-between items-center p-3 bg-background rounded-md">
                <span>Refer a friend</span>
                <span className="font-bold text-primary">+100 Points</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="text-primary" />
                Redeem Rewards
              </CardTitle>
               <CardDescription>
                Use your points to get discounts and gift cards.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-background rounded-md">
                <span>₹500 Off on Furniture</span>
                <Button disabled>500 Points</Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-background rounded-md">
                <span>10% Off on Paints</span>
                 <Button disabled>750 Points</Button>
              </div>
               <div className="flex justify-between items-center p-3 bg-background rounded-md">
                <span>Amazon Gift Card</span>
                 <Button disabled>2000 Points</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
           <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Share2 className="text-primary" />
                Refer a Friend
              </CardTitle>
               <CardDescription>
                Share your unique link and earn points when your friends sign up.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                <div className="p-3 bg-muted rounded-md w-full max-w-md text-center">
                    <p className="text-lg font-mono text-muted-foreground truncate">artistry.ai/invite/USER123</p>
                </div>
                <Button>
                    Copy Link
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
