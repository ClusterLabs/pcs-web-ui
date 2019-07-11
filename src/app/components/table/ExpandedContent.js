import React from "react";

const ExpandedContent = ({ colSpan, children, padding = false }) => (
  <tr className="pf-c-table__expandable-row pf-m-expanded">
    <td colSpan={colSpan} className={!padding ? "pf-m-no-padding" : null}>
      {children}
    </td>
  </tr>
);

export default ExpandedContent;
