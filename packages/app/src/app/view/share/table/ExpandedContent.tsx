import React from "react";
import {ExpandableRowContent, Td, Tr} from "@patternfly/react-table";

export const ExpandedContent = ({
  colSpan,
  children,
}: React.PropsWithChildren<{
  colSpan: number;
}>) => (
  <Tr isExpanded>
    <Td colSpan={colSpan}>
      <ExpandableRowContent>{children}</ExpandableRowContent>
    </Td>
  </Tr>
);
