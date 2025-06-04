import type React from "react";
import {ExpandableRowContent, Td, Tr} from "@patternfly/react-table";

export const ExpandedContent = ({
  colSpan,
  children,
  isEven,
}: React.PropsWithChildren<{
  colSpan: number;
  isEven: boolean;
}>) => (
  <Tr isExpanded isStriped={!isEven}>
    <Td colSpan={colSpan}>
      <ExpandableRowContent>{children}</ExpandableRowContent>
    </Td>
  </Tr>
);
