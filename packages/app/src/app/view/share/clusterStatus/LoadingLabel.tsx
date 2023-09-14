import React from "react";
import {Label} from "@patternfly/react-core";

type LabelProps = React.ComponentProps<typeof Label>;

export const LoadingLabel = (props: {
  icon: LabelProps["icon"];
  children: LabelProps["children"];
  variant?: LabelProps["variant"];
  onClick?: LabelProps["onClick"];
  onMouseEnter?: LabelProps["onMouseEnter"];
  onMouseLeave?: LabelProps["onMouseLeave"];
  style?: LabelProps["style"];
}) => {
  return (
    <Label
      variant={props.variant ?? "outline"}
      color="blue"
      isCompact
      className="pf-u-ml-xs"
      icon={props.icon}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      style={props.style}
    >
      <div style={{minWidth: "8em"}}>{props.children}</div>
    </Label>
  );
};
