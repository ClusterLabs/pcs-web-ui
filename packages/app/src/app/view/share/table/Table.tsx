import React from "react";
import {Table as PfTable} from "@patternfly/react-table";

import {SortableTh} from "./SortableTh";
import {Expansion} from "./Expansion";
import {Body} from "./Body";

const Table = ({
  children,
  isCompact = false,
  isBorderless = false,
  ...rest
}: React.PropsWithChildren<{
  isCompact?: boolean;
  isBorderless?: boolean;
}>) => {
  return (
    <PfTable
      role="grid"
      borders={!isBorderless}
      {...(isCompact ? {variant: "compact"} : {})}
      {...rest}
    >
      {children}
    </PfTable>
  );
};

Table.Body = Body;
Table.Expansion = Expansion;
Table.SortableTh = SortableTh;

export {Table};
