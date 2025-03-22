import type React from "react";

import {useLocation} from "./Router";
import {Button} from "@patternfly/react-core";

export const Link = (props: {
  "data-test"?: string;
  strong?: boolean;
  isInline?: boolean;
  to: string;
  children?: React.ReactNode;
}) => {
  const {navigate} = useLocation();

  let label = props.children;

  if (!label) {
    const parts = props.to.split("/");
    label = parts[parts.length - 1];
  }

  let decoratedLabel = label;
  if (props["data-test"]) {
    decoratedLabel = (
      <span data-test={props["data-test"]}>{decoratedLabel}</span>
    );
  }
  if (props.strong) {
    decoratedLabel = <strong>{decoratedLabel}</strong>;
  }
  return (
    <Button
      variant="link"
      onClick={() => navigate(props.to)}
      isInline={props.isInline}
    >
      {decoratedLabel}
    </Button>
  );
};
