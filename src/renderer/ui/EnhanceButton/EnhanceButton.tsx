import { Sparkles } from "lucide-react";
import { forwardRef } from "react";
import { Button, ButtonProps } from "../Button";
import { ButtonProps as ReactAriaButtonProps } from "react-aria-components";

export interface EnhanceButtonProps
  extends ReactAriaButtonProps{
  size?: ButtonProps["size"];
  tooltip?: React.ReactNode;
}

export const EnhanceButton = forwardRef<HTMLButtonElement, EnhanceButtonProps>(
  ({ size = "default", tooltip, ...props }, ref) => {
    return (
      <Button
        icon={Sparkles}
        variant="enhanced"
        size={size}
        tooltip={tooltip}
        {...props}
        ref={ref}
        />
    );
  },
);
