import React from "react";
import {Tbody} from "@patternfly/react-table";

export const Body = ({
  children,
  isExpanded = false,
  ...rest
}: React.PropsWithChildren<{isExpanded?: boolean}>) => {
  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <Tbody isExpanded={isExpanded} {...rest}>
      {children}
    </Tbody>
  );
};
