"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function EstimatorPage() {
  const [roomSize, setRoomSize] = useState(150);
  const [style, setStyle] = useState("mid-range");
  const [estimate, setEstimate] = useState({ min: 0, max: 0 });

  const calculateEstimate = () => {
    const baseCostPerSqFt = {
      budget: 300,
      "mid-range": 600,
      premium: 1000,
    };
    
    const minCost = roomSize * baseCostPerSqFt[style as keyof typeof baseCostPerSqFt];
    const maxCost = minCost * 1.5;

    setEstimate({ min: minCost, max: maxCost });
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateEstimate();
  }

  return (
    <div className="container mx-auto py-12 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-4xl">Cost Estimator</CardTitle>
          <CardDescription className="text-lg">
            Get a rough idea of your project's budget.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleFormSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="room-size">Room Size (in sq. ft.)</Label>
              <Select onValueChange={(val) => setRoomSize(Number(val))} defaultValue="150">
                <SelectTrigger>
                  <SelectValue placeholder="Select room size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">Small (100 sq.ft.)</SelectItem>
                  <SelectItem value="150">Medium (150 sq.ft.)</SelectItem>
                  <SelectItem value="250">Large (250 sq.ft.)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Style Preference / Budget</Label>
              <RadioGroup defaultValue="mid-range" onValueChange={setStyle} className="flex flex-col sm:flex-row gap-4 pt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="budget" id="budget" />
                  <Label htmlFor="budget">Budget Friendly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mid-range" id="mid-range" />
                  <Label htmlFor="mid-range">Mid-Range</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="premium" id="premium" />
                  <Label htmlFor="premium">Premium</Label>
                </div>
              </RadioGroup>
            </div>
             <Button type="submit" className="w-full">
              Calculate Estimate
            </Button>
          </CardContent>
        </form>

        {estimate.min > 0 && (
          <CardFooter className="flex-col items-center gap-4 pt-6 border-t">
            <div className="text-center">
              <p className="text-muted-foreground">Estimated Cost Range</p>
              <p className="font-headline text-4xl font-bold text-primary">
                ₹{estimate.min.toLocaleString('en-IN')} – ₹{estimate.max.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Button variant="secondary" className="w-full">Book a Free Consultation</Button>
                <Button className="w-full">Get Full Plan</Button>
            </div>
            <p className="text-xs text-muted-foreground text-center px-4">This is a non-binding estimate. Actual costs may vary based on materials, location, and labor.</p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
