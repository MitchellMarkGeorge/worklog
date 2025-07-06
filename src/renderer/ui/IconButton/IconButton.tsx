import { cva, type VariantProps } from "class-variance-authority";
import styles from "./IconButton.module.css";
import { LucideIcon } from "lucide-react";
import { forwardRef } from "react";
import { Button as HeadlessButton } from "@headlessui/react";
import { Tooltip, TooltipTrigger, TooltipContent } from "../Tooltip";

const iconButtonVariants = cva(styles.iconButton, {
  variants: {
    variant: {
      primary: styles.primary,
      destructive: styles.destructive,
      outline: styles.outline,
      // enhanced: styles.enhanced,
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

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  icon: LucideIcon;
  tooltip?: React.ReactNode;
  // loading?: boolean
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { className, variant, size = "default", icon: Icon, tooltip, ...props },
    ref,
  ) => {
    const iconButtonClassNames = iconButtonVariants({
      variant,
      size,
      className,
    });

    const iconContent = (
        <Icon className={styles.icon} />
    );

    if (tooltip) {
      return (
        <Tooltip>
          <TooltipTrigger className={iconButtonClassNames} {...props} ref={ref}>
            {iconContent}
          </TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      );
    }

    return (
      <HeadlessButton className={iconButtonClassNames} ref={ref} {...props}>
        {iconContent}
      </HeadlessButton>
    );
  },
);
