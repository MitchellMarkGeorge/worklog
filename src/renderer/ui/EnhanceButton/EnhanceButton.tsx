import { Sparkles } from "lucide-react";
import { forwardRef } from "react";
import { Button, ButtonProps } from "../Button";

export interface EnhanceButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
      >
        {props.children}
      </Button>
    );
  },
);
