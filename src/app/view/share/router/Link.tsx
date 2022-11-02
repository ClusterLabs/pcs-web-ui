import React from "react";
import {Button} from "@patternfly/react-core";

import {useLocation} from "./Router";

export const Link = ({
  to,
  children,
  "data-test": dataTest,
  strong = false,
  isInline = false,
}: {
  to: string;
  children?: React.ReactNode;
  ["data-test"]?: string;
  strong?: boolean;
  isInline?: boolean;
}) => {
  const {navigate} = useLocation();
  let caption = children;
  if (!caption) {
    const parts = to.split("/");
    caption = parts[parts.length - 1];
  }

  let label = caption;
  if (dataTest) {
    label = <span data-test={dataTest}>{label}</span>;
  }
  if (strong) {
    label = <strong>{label}</strong>;
  }
  return (
    <Button
      variant="link"
      data-test="link"
      onClick={() => navigate(to)}
      isInline={isInline}
    >
      {label}
    </Button>
  );
};
