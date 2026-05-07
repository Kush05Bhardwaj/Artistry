"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";

const DEFAULT_VALUES = {
  easeOfUse: "very-easy",
  satisfaction: "extremely-satisfied",
  visualization: "yes-very-clearly",
  wouldUse: "definitely-yes",
  featureImpressed: "ai-room-redesign",
  suggestions: "",
};

type FeedbackValues = typeof DEFAULT_VALUES;

export function FeedbackForm() {
  const [values, setValues] = useState<FeedbackValues>(DEFAULT_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const updateValue = (key: keyof FeedbackValues, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Failed to submit feedback.");
      }

      toast({
        title: "Thanks for the feedback!",
        description: "Your responses were submitted successfully.",
      });
      setValues(DEFAULT_VALUES);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      toast({
        title: "Submission failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-2xl">Artistry Feedback</CardTitle>
        <CardDescription>Your feedback helps us improve the experience.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-base font-semibold">1. How easy was it to use Artistry for designing your space?</Label>
          <RadioGroup value={values.easeOfUse} onValueChange={(value) => updateValue("easeOfUse", value)} className="gap-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="very-easy" id="ease-very-easy" />
              <Label htmlFor="ease-very-easy">Very Easy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="easy" id="ease-easy" />
              <Label htmlFor="ease-easy">Easy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="average" id="ease-average" />
              <Label htmlFor="ease-average">Average</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="difficult" id="ease-difficult" />
              <Label htmlFor="ease-difficult">Difficult</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="very-difficult" id="ease-very-difficult" />
              <Label htmlFor="ease-very-difficult">Very Difficult</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-semibold">2. How satisfied are you with the AI-generated design suggestions?</Label>
          <RadioGroup value={values.satisfaction} onValueChange={(value) => updateValue("satisfaction", value)} className="gap-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="extremely-satisfied" id="satisfaction-extremely" />
              <Label htmlFor="satisfaction-extremely">Extremely Satisfied</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="satisfied" id="satisfaction-satisfied" />
              <Label htmlFor="satisfaction-satisfied">Satisfied</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="neutral" id="satisfaction-neutral" />
              <Label htmlFor="satisfaction-neutral">Neutral</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unsatisfied" id="satisfaction-unsatisfied" />
              <Label htmlFor="satisfaction-unsatisfied">Unsatisfied</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="very-unsatisfied" id="satisfaction-very-unsatisfied" />
              <Label htmlFor="satisfaction-very-unsatisfied">Very Unsatisfied</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-semibold">3. Did Artistry help you visualize your room better?</Label>
          <RadioGroup value={values.visualization} onValueChange={(value) => updateValue("visualization", value)} className="gap-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes-very-clearly" id="visualize-very" />
              <Label htmlFor="visualize-very">Yes, Very Clearly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes-somehow" id="visualize-somehow" />
              <Label htmlFor="visualize-somehow">Yes, Somehow</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="neutral" id="visualize-neutral" />
              <Label htmlFor="visualize-neutral">Neutral</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="not-much" id="visualize-not-much" />
              <Label htmlFor="visualize-not-much">Not Much</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="not-at-all" id="visualize-not-at-all" />
              <Label htmlFor="visualize-not-at-all">Not at All</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-semibold">4. Would you actually use Artistry while planning or renovating your room/home?</Label>
          <RadioGroup value={values.wouldUse} onValueChange={(value) => updateValue("wouldUse", value)} className="gap-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="definitely-yes" id="use-definitely-yes" />
              <Label htmlFor="use-definitely-yes">Definitely Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="probably-yes" id="use-probably-yes" />
              <Label htmlFor="use-probably-yes">Probably Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="maybe" id="use-maybe" />
              <Label htmlFor="use-maybe">Maybe</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="probably-no" id="use-probably-no" />
              <Label htmlFor="use-probably-no">Probably No</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="definitely-no" id="use-definitely-no" />
              <Label htmlFor="use-definitely-no">Definitely No</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-semibold">5. Which feature impressed you the most?</Label>
          <RadioGroup value={values.featureImpressed} onValueChange={(value) => updateValue("featureImpressed", value)} className="gap-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ai-room-redesign" id="feature-ai-room" />
              <Label htmlFor="feature-ai-room">AI Room Redesign</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="budget-estimation" id="feature-budget" />
              <Label htmlFor="feature-budget">Budget &amp; Cost Estimation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="decor-suggestions" id="feature-decor" />
              <Label htmlFor="feature-decor">Furniture/Decor Suggestions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="diy-planning" id="feature-diy" />
              <Label htmlFor="feature-diy">DIY Planning Experience</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="simplicity" id="feature-simplicity" />
              <Label htmlFor="feature-simplicity">Overall Simplicity &amp; UI</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="feedback" className="text-base font-semibold">6. Your thoughts / suggestions for Artistry</Label>
          <p className="text-sm text-muted-foreground">Tell us honestly what you liked, disliked, or what you want us to improve.</p>
          <Textarea
            id="feedback"
            placeholder="Share your thoughts..."
            value={values.suggestions}
            onChange={(event) => updateValue("suggestions", event.target.value)}
          />
        </div>

        <Button className="w-full" onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
