import React from "react";

import {
  LongArrowAltUpIcon,
  LongArrowAltDownIcon,
  ArrowsAltVIcon,
} from "@patternfly/react-icons";

type Direction = "asc" | "desc";
type Column = string;

interface SortState {
  column: Column,
  direction: Direction,
  change: (c: Column, d: Direction) => void,
}

const SortableTh = (
  {
    children,
    sortState,
    columnName,
    startDesc = false,
  }: React.PropsWithChildren<{
    sortState: SortState,
    columnName: Column,
    startDesc?: boolean,
  }>,
) => {
  const classNameList = ["pf-c-table__sort"];
  if (sortState.column === columnName) {
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
              sortState.column === columnName
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
          {sortState.column !== columnName && <ArrowsAltVIcon />}
          {
            sortState.column === columnName
            &&
            sortState.direction === "asc"
            && (
              <LongArrowAltUpIcon />
            )
          }
          {
            sortState.column === columnName
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

const useSorting = (
  initialColumn: Column = "",
  initialDirection: Direction = "asc",
) => {
  const [column, setColumn] = React.useState(initialColumn);
  const [direction, setDirection] = React.useState(initialDirection);

  const compareItems = (
    compareByColumn: (column: any) => (a: any, b: any) => number,
  ) => {
    const compare = compareByColumn(column);
    return direction === "desc" ? (a: any, b: any) => compare(b, a) : compare;
  };

  const change = React.useCallback(
    (columnName, sortDirection) => {
      setColumn(columnName);
      setDirection(sortDirection);
    },
    [setColumn, setDirection],
  );
  return {
    sortState: { column, direction, change },
    compareItems,
  };
};

SortableTh.useSorting = useSorting;
export default SortableTh;
