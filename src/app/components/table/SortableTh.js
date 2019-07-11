import React from "react";

import {
  LongArrowAltUpIcon,
  LongArrowAltDownIcon,
  ArrowsAltVIcon,
} from "@patternfly/react-icons";

const SortableTh = ({
  children,
  columnName,
  sortColumn,
  setSortColumn,
  direction,
  setDirection,
  startDesc = false,
}) => {
  const classNameList = ["pf-c-table__sort"];
  if (sortColumn === columnName) {
    classNameList.push("pf-m-selected");
  }
  return (
    <th className={classNameList.join(" ")}>
      <button
        type="button"
        className="pf-c-button pf-m-plain"
        onClick={() => {
          setSortColumn(columnName);
          const firstDirection = startDesc ? "desc" : "asc";
          const nextDirection = startDesc ? "asc" : "desc";
          setDirection(
            (sortColumn === columnName && direction === firstDirection)
              ? nextDirection
              : firstDirection
            ,
          );
        }}
      >
        {children}
        <span className="pf-c-table__sort-indicator">
          {sortColumn !== columnName && <ArrowsAltVIcon />}
          {sortColumn === columnName && direction === "asc" && (
            <LongArrowAltUpIcon />
          )}
          {sortColumn === columnName && direction === "desc" && (
            <LongArrowAltDownIcon />
          )}
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
  const BoundSortableTh = React.useCallback(
    ({ children, columnName, startDesc = false }) => (
      <SortableTh
        columnName={columnName}
        sortColumn={column}
        setSortColumn={setColumn}
        direction={direction}
        setDirection={setDirection}
        startDesc={startDesc}
      >
        {children}
      </SortableTh>
    ),
    [column, setColumn, direction, setDirection],
  );
  return {
    column,
    direction,
    SortableTh: BoundSortableTh,
    compareItems,
  };
};

SortableTh.useSorting = useSorting;
export default SortableTh;
