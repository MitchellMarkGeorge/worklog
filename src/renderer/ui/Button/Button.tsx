import { cva, type VariantProps } from "class-variance-authority";
import styles from "./Button.module.css";
import { LucideIcon } from "lucide-react";
import { forwardRef } from "react";
import { Button as HeadlessButton } from "@headlessui/react";
import { Tooltip, TooltipTrigger, TooltipContent } from "../Tooltip";

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
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
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
    const buttonContent = (
      <>
        {Icon && <Icon className={styles.icon} />}
        {children}
      </>
    );
    if (tooltip) {
      return (
        <Tooltip>
          <TooltipTrigger className={buttonClassNames} {...props} ref={ref}>
            {buttonContent}
          </TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      );
    }
    return (
      <HeadlessButton className={buttonClassNames} {...props} ref={ref}>
        {buttonContent}
      </HeadlessButton>
    );
  },
);
