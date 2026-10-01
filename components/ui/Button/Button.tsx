import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import styles from "./Button.module.css";

type ButtonProps = {
  href: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "light";
  fullWidth?: boolean;
  withArrow?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  size = "md",
  variant = "primary",
  fullWidth = false,
  withArrow = true,
  className = "",
}: ButtonProps) {
  const external = /^https?:\/\//.test(href);
  const classes = [
    styles.button,
    styles[size],
    styles[variant],
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href={href}
      className={classes}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
      {withArrow && <ArrowRight className={styles.arrow} aria-hidden />}
    </a>
  );
}
