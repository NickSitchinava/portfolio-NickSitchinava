"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const isHashLink = (anchor: HTMLAnchorElement) => {
      if (!anchor.hash) return false;
      const sameOrigin = anchor.origin === window.location.origin;
      const samePath = anchor.pathname === window.location.pathname;
      return sameOrigin && samePath;
    };

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor || !isHashLink(anchor)) return;

      const id = decodeURIComponent(anchor.hash.slice(1));
      const el = document.getElementById(id);
      if (!el) return;

      event.preventDefault();
      lenis.scrollTo(el, {
        offset: 0,
        duration: 1.7,
        easing: (t: number) => 1 - Math.pow(1 - t, 5),
      });
      history.pushState(null, "", anchor.hash);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return null;
}