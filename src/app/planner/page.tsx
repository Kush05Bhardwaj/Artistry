import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function PlannerPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-4xl font-bold">3D Room Planner</h1>
        <p className="text-lg text-muted-foreground">
          Visualize your design in 3D. Drag, drop, and decorate.
        </p>
      </div>
      
      <div className="max-w-5xl mx-auto p-4 border-2 border-dashed rounded-lg">
        <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-lg">
          <Image
            src="https://placehold.co/1280x720.png"
            alt="3D Room Planner Interface Mockup"
            layout="fill"
            objectFit="cover"
            data-ai-hint="3d planner interior design"
          />
        </div>
      </div>

      <div className="mt-12 text-center">
        <Button size="lg" disabled>
          Launch Full Planner (Coming Soon)
        </Button>
      </div>
    </div>
  );
}
