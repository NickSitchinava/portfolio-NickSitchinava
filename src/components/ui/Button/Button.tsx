"use client";

import { motion } from "framer-motion";
import {
  forwardRef,
  useCallback,
  useEffect,
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

function assignRef<T>(ref: Ref<T>, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
    return;
  }
  if (ref) {
    (ref as MutableRefObject<T | null>).current = value;
  }
}

function hasTextContent(node: ReactNode): boolean {
  if (typeof node === "string" || typeof node === "number") {
    return String(node).trim().length > 0;
  }
  if (Array.isArray(node)) {
    return node.some(hasTextContent);
  }
  if (
    node &&
    typeof node === "object" &&
    "props" in node &&
    (node as { props?: { children?: ReactNode } }).props?.children !== undefined
  ) {
    return hasTextContent(
      (node as { props: { children: ReactNode } }).props.children
    );
  }
  return false;
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
  const [focusVisible, setFocusVisible] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(0);

  const isDisabled =
    "disabled" in props ? Boolean((props as NativeButtonProps).disabled) : false;
  const active = !isDisabled && (hovered || pressed || focusVisible);

  const updateOrigin = useCallback((x: number, y: number) => {
    const node = nodeRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    setOrigin({ x, y });
    setSize(coverDiameter(rect.width, rect.height, x, y));
  }, []);

  const updateOriginFromCenter = useCallback(() => {
    const node = nodeRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    updateOrigin(rect.width / 2, rect.height / 2);
  }, [updateOrigin]);

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

    const fonts = document.fonts;
    if (fonts?.ready) {
      fonts.ready.then(measure).catch(() => undefined);
    }

    return () => observer.disconnect();
  }, [active, origin.x, origin.y]);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const ariaLabel = (props as { "aria-label"?: string })["aria-label"];
    const ariaLabelledBy = (props as { "aria-labelledby"?: string })[
      "aria-labelledby"
    ];
    if (
      hasTextContent(children) ||
      ariaLabel?.trim() ||
      ariaLabelledBy?.trim()
    ) {
      return;
    }
    console.warn(
      "Button: provide visible label text or aria-label / aria-labelledby so the control has an accessible name."
    );
  }, [children, props]);

  const setRef = useCallback(
    (node: HTMLAnchorElement | HTMLButtonElement | null) => {
      nodeRef.current = node;
      assignRef(forwardedRef, node);
    },
    [forwardedRef]
  );

  const pointerHandlers = {
    onPointerEnter: (e: React.PointerEvent) => {
      if (isDisabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      updateOrigin(e.clientX - rect.left, e.clientY - rect.top);
      setHovered(true);
    },
    onPointerMove: (e: React.PointerEvent) => {
      if (isDisabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      updateOrigin(e.clientX - rect.left, e.clientY - rect.top);
    },
    onPointerLeave: () => {
      setHovered(false);
      setPressed(false);
    },
    onPointerDown: (e: React.PointerEvent) => {
      if (isDisabled || e.button !== 0) return;
      const rect = e.currentTarget.getBoundingClientRect();
      updateOrigin(e.clientX - rect.left, e.clientY - rect.top);
      setPressed(true);
      setHovered(true);
    },
    onPointerUp: () => setPressed(false),
    onPointerCancel: () => setPressed(false),
    onFocus: (e: React.FocusEvent) => {
      if (isDisabled) return;
      if (e.currentTarget.matches(":focus-visible")) {
        updateOriginFromCenter();
        setFocusVisible(true);
      }
    },
    onBlur: () => {
      setFocusVisible(false);
      setPressed(false);
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      if (isDisabled || e.repeat || (e.key !== " " && e.key !== "Enter")) {
        return;
      }
      if (e.key === " ") e.preventDefault();
      updateOriginFromCenter();
      setPressed(true);
      setFocusVisible(true);
    },
    onKeyUp: (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        setPressed(false);
        if (!e.currentTarget.matches(":focus-visible")) {
          setFocusVisible(false);
        }
      }
    },
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
      disabled={isDisabled}
      ref={setRef as Ref<HTMLButtonElement>}
      className={combinedClassName}
      style={style}
      whileTap={isDisabled ? undefined : { scale: 0.97 }}
      {...pointerHandlers}
    >
      {content}
    </motion.button>
  );
});

Button.displayName = "Button";