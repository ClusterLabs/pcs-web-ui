import React from "react";

export const ExpandedContent = (
  { colSpan, children, padding = false }: React.PropsWithChildren<{
    colSpan: number;
    padding?: boolean;
  }>,
) => (
  <tr role="row" className="pf-c-table__expandable-row pf-m-expanded">
    <td
      role="cell"
      colSpan={colSpan}
      className={!padding ? "pf-m-no-padding" : ""}
    >
      {children}
    </td>
  </tr>
);
