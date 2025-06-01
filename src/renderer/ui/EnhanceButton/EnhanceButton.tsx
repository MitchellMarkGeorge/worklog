import { Sparkles } from "lucide-react";
import { forwardRef } from "react";
import { Button, ButtonProps } from "../Button";

export interface EnhanceButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonProps["size"];
}

export const EnhanceButton = forwardRef<HTMLButtonElement, EnhanceButtonProps>(
  ({ size = "default", ...props }, ref) => {
    return (
      <Button
        icon={Sparkles}
        variant="enhanced"
        size={size}
        {...props}
        ref={ref}
      >
        {props.children}
      </Button>
    );
  },
);
