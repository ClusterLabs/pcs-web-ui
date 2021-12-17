import React from "react";
import { Button } from "@patternfly/react-core";

import { useLocation } from "./Router";

export const Link: React.FC<{ to: string }> = ({ to, children }) => {
  const { navigate } = useLocation();
  let caption = children;
  if (!caption) {
    const parts = to.split("/");
    caption = parts[parts.length - 1];
  }
  return (
    <Button variant="link" onClick={() => navigate(to)}>
      {caption}
    </Button>
  );
};
