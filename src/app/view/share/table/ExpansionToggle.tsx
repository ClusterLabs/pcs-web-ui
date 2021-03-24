import React from "react";

export function ExpansionToggle({
  expanded,
  setExpanded,
  expandKey,
  children,
  ...rest
}: React.PropsWithChildren<{
  expanded: string;
  setExpanded: (key: string) => void;
  expandKey: string;
}>) {
  const tdClassNames = ["pf-c-table__compound-expansion-toggle"];
  if (expanded === expandKey) {
    tdClassNames.push("pf-m-expanded");
  }

  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <td className={tdClassNames.join(" ")} {...rest}>
      <button
        type="button"
        className="pf-c-table__button pf-m-link"
        onClick={() => setExpanded(expanded !== expandKey ? expandKey : "")}
        data-test="expansion-button"
      >
        {children}
      </button>
    </td>
  );
}
