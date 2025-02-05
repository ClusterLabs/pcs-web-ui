import type React from "react";
import {DescriptionList} from "@patternfly/react-core";

export const ReviewList = (
  props: React.ComponentProps<typeof DescriptionList>,
) => {
  return <DescriptionList isHorizontal {...props} />;
};
