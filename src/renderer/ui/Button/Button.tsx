import { cva, type VariantProps } from "class-variance-authority";
import styles from "./Button.module.css";
import { LucideIcon } from "lucide-react";
import { forwardRef } from "react";
import { Button as HeadlessButton } from "@headlessui/react";

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
  // loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size = "default", children, icon: Icon, ...props }, ref) => {
    const buttonClassNames = buttonVariants({ variant, size, className });
    return (
      <HeadlessButton className={buttonClassNames} ref={ref} {...props}>
        {Icon && <Icon className={styles.icon} />}
        {children}
      </HeadlessButton>
    );
  }
);
