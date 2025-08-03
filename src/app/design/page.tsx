import { DesignForm } from "./design-form";

export default function DesignPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-4xl font-bold">Upload Your Room</h1>
        <p className="text-lg text-muted-foreground">
          Let our AI be your personal interior designer. Just upload a photo to begin.
        </p>
      </div>
      <DesignForm />
    </div>
  );
}
