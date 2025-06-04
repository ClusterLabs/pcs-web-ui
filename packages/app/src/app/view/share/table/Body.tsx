import type React from "react";
import {Tbody} from "@patternfly/react-table";

export const Body = ({
  children,
  isExpanded = false,
  isEvenStriped = false,
  isOddStriped = false,
  ...rest
}: React.PropsWithChildren<{
  isExpanded?: boolean;
  isEvenStriped?: boolean;
  isOddStriped?: boolean;
}>) => {
  return (
    <Tbody
      isExpanded={isExpanded}
      isEvenStriped={isEvenStriped}
      isOddStriped={isOddStriped}
      {...rest}
    >
      {children}
    </Tbody>
  );
};
