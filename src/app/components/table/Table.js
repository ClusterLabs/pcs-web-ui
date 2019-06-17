import React from "react";

import ExpansionToggle from "./ExpansionToggle";
import ExpandableRow from "./ExpandableRow";
import ExpandedContent from "./ExpandedContent";
import Body from "./Body";

const Table = ({
  children,
  isCompact = false,
  isBorderless = false,
  isExpandable = false,
  ...rest
}) => {
  const classNameList = [
    "pf-c-table",
    "pf-m-grid-md",
  ];
  if (isCompact) {
    classNameList.push("pf-m-compact");
  }
  if (isBorderless) {
    classNameList.push("pf-m-no-border-rows");
  }
  if (isExpandable) {
    classNameList.push("pf-m-expandable");
  }
  return (
    <table className={classNameList.join(" ")} {...rest}>
      {children}
    </table>
  );
};

Table.Body = Body;
Table.ExpansionToggle = ExpansionToggle;
Table.ExpandableRow = ExpandableRow;
Table.ExpandedContent = ExpandedContent;

export default Table;
