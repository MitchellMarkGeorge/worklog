import { cx } from "class-variance-authority";
import type {TooltipProps as ReactAriaTooltipProps} from "react-aria-components"
import { Tooltip as ReactAriaTooltip } from "react-aria-components"

import styles from "./Tooltip.module.css";


export interface TooltipProps extends Omit<ReactAriaTooltipProps, "children"> {
  children: React.ReactNode;
}

export const Tooltip = ({ children, className, ...props }: TooltipProps) => {
  const tooltipClassNames = cx(styles.tooltip, className);
  return (
    <ReactAriaTooltip className={tooltipClassNames} offset={props.offset ?? 5} {...props}>
      {children}
    </ReactAriaTooltip>
  );
};
