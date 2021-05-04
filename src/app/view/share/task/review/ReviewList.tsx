import React from "react";
import { DescriptionList } from "@patternfly/react-core";

export const ReviewList: React.FC = ({ children }) => {
  return <DescriptionList isHorizontal>{children}</DescriptionList>;
};
