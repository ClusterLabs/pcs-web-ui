import type React from "react";
import {Tbody} from "@patternfly/react-table";

export const Body = ({
  children,
  isExpanded = false,
  ...rest
}: React.PropsWithChildren<{isExpanded?: boolean}>) => {
  return (
    <Tbody isExpanded={isExpanded} {...rest}>
      {children}
    </Tbody>
  );
};
