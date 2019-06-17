import React from "react";

export default ({ expanded, onClick, children, ...rest }) => (
  <td
    className={
      `pf-c-table__compound-expansion-toggle ${expanded ? "pf-m-expanded" : ""}`
    }
    {...rest}
  >
    <button
      className="pf-c-button pf-m-link"
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  </td>
);
