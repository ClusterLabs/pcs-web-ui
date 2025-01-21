import type React from "react";
import {ToolbarItem as PFToolbarItem} from "@patternfly/react-core";

export const ToolbarItem = (
  props: React.ComponentProps<typeof PFToolbarItem>,
) => {
  return <PFToolbarItem spacer={{default: "spacerMd"}} {...props} />;
};
