import React from "react";

export default ({
  expanded,
  onClick,
  children,
  ...rest
}) => {
  const tdClassNames = [
    "pf-c-table__compound-expansion-toggle",
  ];
  if (expanded) {
    tdClassNames.push("pf-m-expanded");
  }

  const buttonClassNames = [
    "pf-c-button",
    "pf-m-link",
    "pf-m-gutter",
    "pf-l-split",
  ];
  // TODO display: flex is supposed to be applied by pf-l-split, however
  // display: inline-block from pf-c-button is applied
  return (
    <td className={tdClassNames.join(" ")} {...rest}>
      <button
        style={{ display: "flex" }}
        type="button"
        className={buttonClassNames.join(" ")}
        onClick={onClick}
      >
        {children}
      </button>
    </td>
  );
};
