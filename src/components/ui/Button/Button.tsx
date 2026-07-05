"use client";

import { motion } from "framer-motion";
import {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  MutableRefObject,
  ReactNode,
  Ref,
} from "react";
import styles from "./button.module.css";

const FILL_DURATION = 0.5;
const FILL_EASE = [0.16, 1, 0.3, 1] as const;

type MotionConflictingHandlers =
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onDrag"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragExit"
  | "onDragLeave"
  | "onDragOver"
  | "onDragStart"
  | "onDrop";

function coverDiameter(width: number, height: number, x: number, y: number) {
  return Math.ceil(
    2 *
      Math.max(
        Math.hypot(x, y),
        Math.hypot(width - x, y),
        Math.hypot(x, height - y),
        Math.hypot(width - x, height - y)
      )
  );
}

type CommonProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

type AnchorProps = CommonProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | MotionConflictingHandlers
  > & { href: string };

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, MotionConflictingHandlers> & {
    href?: undefined;
  };

export type ButtonProps = AnchorProps | NativeButtonProps;

export const Button = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonProps
>(({ children, className, style, ...props }, forwardedRef) => {
  const nodeRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(0);
  const active = hovered || pressed;

  const updateOrigin = useCallback((x: number, y: number) => {
    const node = nodeRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    setOrigin({ x, y });
    setSize(coverDiameter(rect.width, rect.height, x, y));
  }, []);

  useLayoutEffect(() => {
    const node = nodeRef.current;
    if (!node || !active) return;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      setSize(coverDiameter(rect.width, rect.height, origin.x, origin.y));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [active, origin.x, origin.y]);

  const setRef = useCallback(
    (node: HTMLAnchorElement | HTMLButtonElement | null) => {
      nodeRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef)
        (forwardedRef as MutableRefObject<typeof node>).current = node;
    },
    [forwardedRef]
  );

  const pointerHandlers = {
    onPointerEnter: (e: React.PointerEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      updateOrigin(e.clientX - rect.left, e.clientY - rect.top);
      setHovered(true);
    },
    onPointerMove: (e: React.PointerEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      updateOrigin(e.clientX - rect.left, e.clientY - rect.top);
    },
    onPointerLeave: () => {
      setHovered(false);
      setPressed(false);
    },
    onPointerDown: (e: React.PointerEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      updateOrigin(e.clientX - rect.left, e.clientY - rect.top);
      setPressed(true);
    },
    onPointerUp: () => setPressed(false),
  };

  const content = (
    <>
      <motion.span
        aria-hidden
        className={styles.fill}
        initial={false}
        animate={{ scale: active && size > 0 ? 1 : 0 }}
        transition={{ duration: FILL_DURATION, ease: FILL_EASE }}
        style={{
          width: size,
          height: size,
          left: origin.x - size / 2,
          top: origin.y - size / 2,
        }}
      />
      <span className={styles.label}>{children}</span>
    </>
  );

  const combinedClassName = `${styles.button} ${active ? styles.active : ""} ${
    className ?? ""
  }`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props as AnchorProps;
    return (
      <motion.a
        {...rest}
        href={href}
        ref={setRef as Ref<HTMLAnchorElement>}
        className={combinedClassName}
        style={style}
        whileTap={{ scale: 0.97 }}
        {...pointerHandlers}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...(props as NativeButtonProps)}
      ref={setRef as Ref<HTMLButtonElement>}
      className={combinedClassName}
      style={style}
      whileTap={{ scale: 0.97 }}
      {...pointerHandlers}
    >
      {content}
    </motion.button>
  );
});

Button.displayName = "Button";