import React from "react";

function ExpansionToggle(
  {
    expanded,
    setExpanded,
    expandKey,
    children,
    ...rest
  }: React.PropsWithChildren<{
    expanded: string,
    setExpanded: (key: string) => void,
    expandKey: string,
  }>,
) {
  const tdClassNames = [
    "pf-c-table__compound-expansion-toggle",
  ];
  if (expanded === expandKey) {
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
  // so display: flex is used explicitly
  return (
    <td className={tdClassNames.join(" ")} {...rest}>
      <button
        style={{ display: "flex" }}
        type="button"
        className={buttonClassNames.join(" ")}
        onClick={() => setExpanded(expanded !== expandKey ? expandKey : "")}
      >
        {children}
      </button>
    </td>
  );
}

export default ExpansionToggle;
