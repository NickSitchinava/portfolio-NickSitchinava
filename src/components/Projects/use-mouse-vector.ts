"use client";

import { useEffect, useRef, useState } from "react";

export interface MousePosition {
  x: number;
  y: number;
}

export interface MouseVector {
  vx: number;
  vy: number;
}

export function useMouseVector(containerRef?: React.RefObject<HTMLElement | null>) {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [vector, setVector] = useState<MouseVector>({ vx: 0, vy: 0 });
  const lastPosRef = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const target = containerRef?.current ?? window;

    const handleMove = (event: MouseEvent) => {
      let x = event.clientX;
      let y = event.clientY;

      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
      }

      const vx = x - lastPosRef.current.x;
      const vy = y - lastPosRef.current.y;

      lastPosRef.current = { x, y };
      setPosition({ x, y });
      setVector({ vx, vy });
    };

    const handleTouch = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      let x = touch.clientX;
      let y = touch.clientY;

      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        x = touch.clientX - rect.left;
        y = touch.clientY - rect.top;
      }

      const vx = x - lastPosRef.current.x;
      const vy = y - lastPosRef.current.y;

      lastPosRef.current = { x, y };
      setPosition({ x, y });
      setVector({ vx, vy });
    };

    target.addEventListener("mousemove", handleMove as EventListener);
    target.addEventListener("touchmove", handleTouch as EventListener);

    return () => {
      target.removeEventListener("mousemove", handleMove as EventListener);
      target.removeEventListener("touchmove", handleTouch as EventListener);
    };
  }, [containerRef]);

  return { position, vector };
}