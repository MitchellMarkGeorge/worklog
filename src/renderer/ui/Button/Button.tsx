import { cva, type VariantProps } from "class-variance-authority";
import styles from "./Button.module.css";
import { LucideIcon } from "lucide-react";
import React, { forwardRef } from "react";
import {
  Button as ReactAriaButton,
  ButtonProps as ReactAriaButtonProps,
  TooltipTrigger,
} from "react-aria-components";
import { Tooltip } from "../Tooltip";

const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      primary: styles.primary,
      destructive: styles.destructive,
      outline: styles.outline,
      enhanced: styles.enhanced,
      ghost: styles.ghost,
    },
    size: {
      default: styles.default,
      medium: styles.medium,
      large: styles.large,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

export interface ButtonProps
  extends ReactAriaButtonProps,
    VariantProps<typeof buttonVariants> {
  icon?: LucideIcon;
  tooltip?: React.ReactNode;
  // loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size = "default",
      children,
      icon: Icon,
      tooltip,
      ...props
    },
    ref,
  ) => {
    const buttonClassNames = buttonVariants({ variant, size, className });
    const button = (
      <ReactAriaButton className={buttonClassNames} {...props} ref={ref}>
        <>
          {Icon && <Icon className={styles.icon} />}
          {children}
        </>
      </ReactAriaButton>
    );
    if (tooltip) {
      return (
        <TooltipTrigger delay={0}>
          {button}
          <Tooltip>{tooltip}</Tooltip>
        </TooltipTrigger>
      );
    }
    return button;
  }
);
