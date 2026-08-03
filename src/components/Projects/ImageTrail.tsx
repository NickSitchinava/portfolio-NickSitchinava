"use client";

import {
  Children,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useMouseVector } from "./use-mouse-vector";
import styles from "./ImageTrail.module.css";

interface ImageTrailProps {
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLElement | null>;
  newOnTop?: boolean;
  interval?: number;
  minDistance?: number;
  tailLength?: number;
}

const IDLE_DELAY = 900;
const IDLE_PERIOD_X = 6200;
const IDLE_PERIOD_Y = 5100;
const IDLE_SPAWN_INTERVAL = 220;
const IDLE_MIN_DISTANCE = 44;

const ImageTrail = ({
  children,
  newOnTop = true,
  containerRef,
  interval = 100,
  minDistance = 40,
  tailLength = 5,
}: ImageTrailProps) => {
  const lastAddedTimeRef = useRef<number>(0);
  const { position: mousePosition } = useMouseVector(containerRef);
  const lastMousePosRef = useRef(mousePosition);
  const lastSpawnPosRef = useRef(mousePosition);
  const globalIndexRef = useRef(0);
  const isHoveringRef = useRef(false);
  const isVisibleRef = useRef(true);
  const idleSinceRef = useRef<number | null>(null);
  const slotElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafIdRef = useRef(0);

  const childrenArray = useMemo(() => Children.toArray(children), [children]);

  useEffect(() => {
    const node = containerRef?.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          idleSinceRef.current = null;
        }
      },
      { threshold: 0.1, rootMargin: "150px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [containerRef]);

  useEffect(() => {
    const node = containerRef?.current;
    if (!node) return;

    const handleEnter = () => {
      isHoveringRef.current = true;
      idleSinceRef.current = null;
    };
    const handleLeave = () => {
      isHoveringRef.current = false;
      idleSinceRef.current = null;
    };

    node.addEventListener("pointerenter", handleEnter);
    node.addEventListener("pointerleave", handleLeave);
    return () => {
      node.removeEventListener("pointerenter", handleEnter);
      node.removeEventListener("pointerleave", handleLeave);
    };
  }, [containerRef]);

  const activate = useCallback(
    (index: number, x: number, y: number) => {
      const el = slotElsRef.current[index];
      if (!el) return;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.zIndex = String((globalIndexRef.current % childrenArray.length) + 1);
      el.dataset.status = "active";
    },
    [childrenArray.length]
  );

  const deactivate = useCallback((index: number) => {
    const el = slotElsRef.current[index];
    if (!el) return;
    el.dataset.status = "inactive";
  }, []);

  const spawn = useCallback(
    (x: number, y: number) => {
      if (childrenArray.length === 0) return;

      const len = childrenArray.length;
      const leadIndex = globalIndexRef.current % len;
      const tailIndex = (((globalIndexRef.current - tailLength) % len) + len) % len;

      activate(leadIndex, x, y);
      if (globalIndexRef.current >= tailLength) {
        deactivate(tailIndex);
      }

      globalIndexRef.current++;
    },
    [childrenArray.length, tailLength, activate, deactivate]
  );

  useEffect(() => {
    const tick = (time: number) => {
      rafIdRef.current = requestAnimationFrame(tick);

      if (!isVisibleRef.current) {
        idleSinceRef.current = null;
        return;
      }

      if (!isHoveringRef.current) {
        if (idleSinceRef.current === null) {
          idleSinceRef.current = time;
        }

        const elapsed = time - idleSinceRef.current;
        if (elapsed < IDLE_DELAY) return;

        const node = containerRef?.current;
        const width = node?.clientWidth ?? 0;
        const height = node?.clientHeight ?? 0;
        if (width === 0 || height === 0) return;

        const t = elapsed - IDLE_DELAY;
        const centerX = width / 2;
        const centerY = height / 2;
        const rangeX = width * 0.32;
        const rangeY = height * 0.28;

        const idlePos = {
          x: centerX + Math.sin((t / IDLE_PERIOD_X) * Math.PI * 2) * rangeX,
          y:
            centerY +
            Math.sin((t / IDLE_PERIOD_Y) * Math.PI * 2 + Math.PI / 3) * rangeY,
        };

        if (time - lastAddedTimeRef.current < IDLE_SPAWN_INTERVAL) return;

        const dx = idlePos.x - lastSpawnPosRef.current.x;
        const dy = idlePos.y - lastSpawnPosRef.current.y;
        if (Math.hypot(dx, dy) < IDLE_MIN_DISTANCE) return;

        lastAddedTimeRef.current = time;
        lastSpawnPosRef.current = idlePos;
        spawn(idlePos.x, idlePos.y);
        return;
      }

      if (
        lastMousePosRef.current.x === mousePosition.x &&
        lastMousePosRef.current.y === mousePosition.y
      ) {
        return;
      }
      lastMousePosRef.current = mousePosition;

      if (time - lastAddedTimeRef.current < interval) return;

      const dx = mousePosition.x - lastSpawnPosRef.current.x;
      const dy = mousePosition.y - lastSpawnPosRef.current.y;
      if (Math.hypot(dx, dy) < minDistance) return;

      lastAddedTimeRef.current = time;
      lastSpawnPosRef.current = mousePosition;
      spawn(mousePosition.x, mousePosition.y);
    };

    rafIdRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafIdRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mousePosition, spawn, interval, minDistance, containerRef]);

  return (
    <div className={styles.trailWrap}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          ref={(node) => {
            slotElsRef.current[index] = node;
          }}
          className={styles.trailItem}
          data-status="inactive"
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export { ImageTrail };