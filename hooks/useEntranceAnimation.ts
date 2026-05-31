"use client";

import { useEffect, useState } from "react";

export function useEntranceAnimation() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return ready;
}

export function entranceClass(ready: boolean) {
  return ready ? "hero-animate-in" : "hero-animate-pending";
}
