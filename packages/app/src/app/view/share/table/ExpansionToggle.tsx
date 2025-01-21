import type React from "react";
import {Td} from "@patternfly/react-table";

export function ExpansionToggle({
  expanded,
  setExpanded,
  expandKey,
  children,
  "data-test": dataTest,
  ...rest
}: React.PropsWithChildren<{
  expanded: string;
  setExpanded: (_key: string) => void;
  expandKey: string;
  "data-test": string;
}>) {
  return (
    <Td
      compoundExpand={{
        isExpanded: expanded === expandKey,
        onToggle: () => setExpanded(expanded !== expandKey ? expandKey : ""),
      }}
      data-test={dataTest}
      {...rest}
    >
      {children}
    </Td>
  );
}
