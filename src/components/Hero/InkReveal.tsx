"use client";

import { useEffect, useRef, useCallback, useState } from "react";

export interface InkRevealProps {
  maskColor?: [number, number, number];
  brushSize?: number;
  lifetime?: number;
  rStart?: number;
  rVary?: number;
  stampStep?: number;
  maxStamps?: number;
  segments?: number;
  wobble?: [number, number, number];
  gradientInnerRadius?: number;
  gradientStops?: [number, number, number];
  className?: string;
  style?: React.CSSProperties;
}

interface Stamp {
  x: number;
  y: number;
  born: number;
  seed: number;
  rmax: number;
}

const IDLE_DELAY = 1400;

export default function InkReveal({
  maskColor = [244, 243, 240],
  brushSize = 150,
  lifetime = 650,
  rStart = 10,
  rVary = 0.45,
  stampStep = 10,
  maxStamps = 240,
  segments = 36,
  wobble = [0.14, 0.08, 0.05],
  gradientInnerRadius = 0.2,
  gradientStops = [0.95, 0.88, 0],
  className,
  style,
}: InkRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stampsRef = useRef<Stamp[]>([]);
  const runningRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const dimsRef = useRef({ w: 0, h: 0 });
  const idleSinceRef = useRef<number | null>(null);
  const inViewRef = useRef(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [fineOnly, setFineOnly] = useState(true);

  const mc = maskColor;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFineOnly(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const skipMask = reducedMotion || !fineOnly;

  useEffect(() => {
    if (skipMask) return;
    const canvas = canvasRef.current;
    if (!canvas || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          idleSinceRef.current = null;
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [skipMask]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = parent.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    dimsRef.current = { w, h };
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = `rgb(${mc[0]},${mc[1]},${mc[2]})`;
    ctx.fillRect(0, 0, w, h);
  }, [mc]);

  const carveInk = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, seed: number, alpha: number) => {
      const g = ctx.createRadialGradient(x, y, r * gradientInnerRadius, x, y, r);
      g.addColorStop(0, `rgba(0,0,0,${gradientStops[0] * alpha})`);
      g.addColorStop(0.5, `rgba(0,0,0,${gradientStops[1] * alpha})`);
      g.addColorStop(1, `rgba(0,0,0,${gradientStops[2] * alpha})`);
      ctx.fillStyle = g;

      ctx.beginPath();
      for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        const wob =
          0.78 +
          wobble[0] * Math.sin(a * 3 + seed) +
          wobble[1] * Math.sin(a * 5 + seed * 2.1) +
          wobble[2] * Math.sin(a * 7 + seed * 0.7);
        const px = x + Math.cos(a) * r * wob;
        const py = y + Math.sin(a) * r * wob;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    },
    [segments, wobble, gradientInnerRadius, gradientStops]
  );

  const addStamp = useCallback(
    (x: number, y: number) => {
      const stamps = stampsRef.current;
      if (stamps.length >= maxStamps) stamps.shift();
      stamps.push({
        x,
        y,
        born: performance.now(),
        seed: Math.random() * Math.PI * 2,
        rmax: brushSize * (1 - rVary + Math.random() * rVary),
      });
    },
    [brushSize, rVary, maxStamps]
  );

  const stampAlong = useCallback(
    (x: number, y: number) => {
      const last = lastPosRef.current;
      if (!last) {
        addStamp(x, y);
      } else {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const steps = Math.max(1, Math.ceil(dist / stampStep));
        for (let i = 1; i <= steps; i++) {
          addStamp(last.x + (dx * i) / steps, last.y + (dy * i) / steps);
        }
      }
      lastPosRef.current = { x, y };
    },
    [addStamp, stampStep]
  );

  const startLoopRef = useRef<() => void>(() => {});

  const loop = useCallback(() => {
    if (!inViewRef.current) {
      runningRef.current = false;
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { w, h } = dimsRef.current;
    const now = performance.now();
    const stamps = stampsRef.current;

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = `rgb(${mc[0]},${mc[1]},${mc[2]})`;
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "destination-out";

    for (let i = stamps.length - 1; i >= 0; i--) {
      const t = (now - stamps[i].born) / lifetime;
      if (t >= 1) {
        stamps.splice(i, 1);
        continue;
      }
      const ease = 1 - Math.pow(1 - t, 3);
      const r = rStart + (stamps[i].rmax - rStart) * ease;
      const alpha = 1 - t * t;
      carveInk(ctx, stamps[i].x, stamps[i].y, r, stamps[i].seed, alpha);
    }

    if (stamps.length) {
      requestAnimationFrame(loop);
    } else {
      runningRef.current = false;
    }
  }, [carveInk, mc, lifetime, rStart]);

  const startLoop = useCallback(() => {
    if (!inViewRef.current) return;
    if (!runningRef.current) {
      runningRef.current = true;
      requestAnimationFrame(loop);
    }
  }, [loop]);

  startLoopRef.current = startLoop;

  useEffect(() => {
    if (skipMask) return;
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize, skipMask]);

  useEffect(() => {
    if (skipMask) return;

    let rafId = 0;
    let lastSpawn = 0;

    const idleTick = (time: number) => {
      rafId = requestAnimationFrame(idleTick);

      if (!inViewRef.current) {
        idleSinceRef.current = null;
        return;
      }

      if (idleSinceRef.current === null) {
        idleSinceRef.current = time;
        return;
      }
      const elapsed = time - idleSinceRef.current;
      if (elapsed < IDLE_DELAY) return;

      const { w, h } = dimsRef.current;
      if (w === 0 || h === 0) return;
      if (time - lastSpawn < 90) return;
      lastSpawn = time;

      const t = (elapsed - IDLE_DELAY) * 0.001;
      const cx = w / 2 + Math.sin(t * 0.6) * w * 0.28;
      const cy = h / 2 + Math.sin(t * 0.9 + 1.2) * h * 0.24;
      stampAlong(cx, cy);
      startLoopRef.current();
    };
    rafId = requestAnimationFrame(idleTick);
    return () => cancelAnimationFrame(rafId);
  }, [skipMask, stampAlong]);

  const getRelativePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const resetIdle = () => {
    idleSinceRef.current = performance.now();
  };

  if (skipMask) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: "absolute", inset: 0, cursor: "none", ...style }}
      onMouseEnter={(e) => {
        resetIdle();
        const pos = getRelativePos(e);
        lastPosRef.current = pos;
        stampAlong(pos.x, pos.y);
        startLoop();
      }}
      onMouseMove={(e) => {
        resetIdle();
        const pos = getRelativePos(e);
        stampAlong(pos.x, pos.y);
        startLoop();
      }}
      onMouseLeave={() => {
        lastPosRef.current = null;
      }}
    />
  );
}