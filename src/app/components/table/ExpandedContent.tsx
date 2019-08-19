import React from "react";

const ExpandedContent = (
  { colSpan, children, padding = false }: React.PropsWithChildren<{
    colSpan: number,
    padding?: boolean,
  }>,
) => (
  <tr className="pf-c-table__expandable-row pf-m-expanded">
    <td colSpan={colSpan} className={!padding ? "pf-m-no-padding" : ""}>
      {children}
    </td>
  </tr>
);

export default ExpandedContent;
