import React from "react";

import {
  LongArrowAltUpIcon,
  LongArrowAltDownIcon,
  ArrowsAltVIcon,
} from "@patternfly/react-icons";

const SortableTh = ({
  children,
  sortState,
  columnName,
  startDesc = false,
}) => {
  const classNameList = ["pf-c-table__sort"];
  if (sortState.sortColumn === columnName) {
    classNameList.push("pf-m-selected");
  }
  return (
    <th className={classNameList.join(" ")}>
      <button
        type="button"
        className="pf-c-button pf-m-plain"
        onClick={() => {
          const firstDirection = startDesc ? "desc" : "asc";
          const nextDirection = startDesc ? "asc" : "desc";
          sortState.change(
            columnName,
            (
              sortState.sortColumn === columnName
              &&
              sortState.direction === firstDirection
            )
              ? nextDirection
              : firstDirection
            ,
          );
        }}
      >
        {children}
        <span className="pf-c-table__sort-indicator">
          {sortState.sortColumn !== columnName && <ArrowsAltVIcon />}
          {
            sortState.sortColumn === columnName
            &&
            sortState.direction === "asc"
            && (
              <LongArrowAltUpIcon />
            )
          }
          {
            sortState.sortColumn === columnName
            &&
            sortState.direction === "desc"
            && (
              <LongArrowAltDownIcon />
            )
          }
        </span>
      </button>
    </th>
  );
};

const useSorting = (initialColumn = "", initialDirection = "asc") => {
  const [column, setColumn] = React.useState(initialColumn);
  const [direction, setDirection] = React.useState(initialDirection);
  const compareItems = (compareByColumn) => {
    const compare = compareByColumn(column);
    return direction === "desc" ? (a, b) => compare(b, a) : compare;
  };
  const change = React.useCallback(
    (columnName, sortDirection) => {
      setColumn(columnName);
      setDirection(sortDirection);
    },
    [setColumn, setDirection],
  );
  return {
    sortState: {
      column,
      direction,
      change,
    },
    compareItems,
  };
};

SortableTh.useSorting = useSorting;
export default SortableTh;
