import { cva, type VariantProps } from "class-variance-authority";
import styles from "./IconButton.module.css";
import { LucideIcon } from "lucide-react";
import { forwardRef } from "react";
import {
  Button as ReactAriaButton,
  ButtonProps as ReactAriaButtonProps,
  TooltipTrigger,
} from "react-aria-components";
import { Tooltip } from "../Tooltip";

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
  extends ReactAriaButtonProps,
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

    const iconButton = (
      <ReactAriaButton className={iconButtonClassNames} {...props} ref={ref}>
        {<Icon className={styles.icon} />}
      </ReactAriaButton>
    );

    if (tooltip) {
      return (
        <TooltipTrigger delay={0}>
          {iconButton}
          <Tooltip>{tooltip}</Tooltip>
        </TooltipTrigger>
      );
    }

    return iconButton;
  },
);
