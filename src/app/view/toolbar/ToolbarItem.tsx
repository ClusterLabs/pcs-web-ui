import React from "react";
import { ToolbarItem as PFToolbarItem } from "@patternfly/react-core";

export const ToolbarItem = (
  props: React.ComponentProps<typeof PFToolbarItem>,
) => {
  /* eslint-disable react/jsx-props-no-spreading */
  return <PFToolbarItem spacer={{ default: "spacerMd" }} {...props} />;
};
