import React from "react";
import { DescriptionList } from "@patternfly/react-core";

export const ReviewList = ({ children }: { children: React.ReactNode }) => {
  return <DescriptionList isHorizontal>{children}</DescriptionList>;
};
