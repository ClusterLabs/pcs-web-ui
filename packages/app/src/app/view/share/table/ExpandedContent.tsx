import React from "react";
import {ExpandableRowContent, Td, Tr} from "@patternfly/react-table";

export const ExpandedContent = ({
  colSpan,
  children,
  padding = false,
}: React.PropsWithChildren<{
  colSpan: number;
  padding?: boolean;
}>) => (
  <Tr isExpanded>
    <Td colSpan={colSpan} noPadding={!padding}>
      <ExpandableRowContent>
        <div className="pf-v5-u-pl-xl">{children}</div>
      </ExpandableRowContent>
    </Td>
  </Tr>
);
