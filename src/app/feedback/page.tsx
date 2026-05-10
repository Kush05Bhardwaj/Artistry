import { FeedbackForm } from "@/components/feedback-form";

export default function FeedbackPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-4xl font-bold">Share Your Feedback</h1>
        <p className="text-lg text-muted-foreground">
          Help us improve Artistry AI by sharing your experience
        </p>
      </div>
      <div className="flex justify-center">
        <FeedbackForm />
      </div>
    </div>
  );
}
