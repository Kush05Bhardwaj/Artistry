"use client";

import { useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";

type ComparisonSliderProps = {
  before: string;
  after: string;
  beforeHint: string;
  afterHint: string;
};

export function ComparisonSlider({ before, after, beforeHint, afterHint }: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="relative w-full aspect-[3/2] overflow-hidden rounded-lg shadow-2xl group">
      <Image
        src={before}
        alt="Before design"
        layout="fill"
        objectFit="cover"
        data-ai-hint={beforeHint}
      />
      <div
        className="absolute top-0 left-0 h-full w-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={after}
          alt="After design"
          layout="fill"
          objectFit="cover"
          data-ai-hint={afterHint}
        />
      </div>
      <div
        className="absolute top-0 h-full w-1.5 cursor-ew-resize bg-white/50 backdrop-blur-sm"
        style={{ left: `calc(${sliderPosition}% - 3px)` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-md">
          <MoveHorizontal className="h-6 w-6 text-primary" />
        </div>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="absolute top-0 left-0 w-full h-full cursor-ew-resize opacity-0"
        aria-label="Comparison slider"
      />
    </div>
  );
}
