import React from "react";
import ExpandableRow from "./ExpandableRow";

export default ({ colSpan, children, padding = false }) => (
  <ExpandableRow>
    <td colSpan={colSpan} className={!padding ? "pf-m-no-padding" : null}>
      {children}
    </td>
  </ExpandableRow>
);
