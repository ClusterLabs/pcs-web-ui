import React from "react";
import {
  DataList,
  DataListContent,
} from "@patternfly/react-core";

export const ResourceTreeNested = ({
  ariaLabel,
  nestingDepth,
  children,
}: React.PropsWithChildren<{
  ariaLabel: string,
  nestingDepth: number,
}>) => (
  <DataListContent
    aria-label={`${ariaLabel}: area`}
    noPadding
  >
    <DataList
      aria-label={ariaLabel}
      data-level={nestingDepth}
    >
      {children}
    </DataList>
  </DataListContent>
);
