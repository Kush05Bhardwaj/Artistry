
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    let active = true;
    const track = async () => {
      try {
        await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: pathname }),
          // keepalive: true
        });
      } catch (e) {
        // ignore
      }
    };
    if (pathname && active) track();
    return () => { active = false; };
  }, [pathname]);

  return null;
}