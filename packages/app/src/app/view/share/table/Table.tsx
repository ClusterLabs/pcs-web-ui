import type React from "react";
import {Table as PfTable} from "@patternfly/react-table";

import {SortableTh} from "./SortableTh";
import {Expansion} from "./Expansion";
import {Body} from "./Body";

const Table = ({
  children,
  isCompact = false,
  isBorderless = false,
  isStriped = true,
  className,
  ...rest
}: React.PropsWithChildren<{
  isCompact?: boolean;
  isBorderless?: boolean;
  isStriped?: boolean;
  className?: string;
}>) => {
  return (
    <PfTable
      role="grid"
      borders={!isBorderless}
      {...(isCompact ? {variant: "compact"} : {})}
      {...(isStriped ? {isStriped} : {})}
      {...(className ? {className} : {})}
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
