import React from "react";

import {
  LongArrowAltUpIcon,
  LongArrowAltDownIcon,
  ArrowsAltVIcon,
} from "@patternfly/react-icons";

type Direction = "asc" | "desc";

interface SortState<COLUMN> {
  column: COLUMN|"",
  direction: Direction,
  change: (c: COLUMN, d: Direction) => void,
}

function SortableTh<C extends string>(
  {
    children,
    sortState,
    columnName,
    startDesc = false,
  }: React.PropsWithChildren<{
    sortState: SortState<C>,
    columnName: C,
    startDesc?: boolean,
  }>,
) {
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
}

function useSorting<COLUMN extends string>(
  initialColumn: COLUMN|"" = "",
  initialDirection: Direction = "asc",
) {
  const [column, setColumn] = React.useState(initialColumn);
  const [direction, setDirection] = React.useState(initialDirection);

  const compareItems = (
    compareByColumn: (column: COLUMN|"") => (a: any, b: any) => number,
  ) => {
    const compare = compareByColumn(column);
    return direction === "desc" ? (a: any, b: any) => compare(b, a) : compare;
  };

  const change = React.useCallback(
    (columnName: COLUMN, sortDirection: Direction) => {
      setColumn(columnName);
      setDirection(sortDirection);
    },
    [setColumn, setDirection],
  );
  const sortState: SortState<COLUMN> = { column, direction, change };
  return { sortState, compareItems };
}


// A helper that allows specify collumns types for both, SortableTh component
// and useSorting hook at once.
function bindColumns<COLUMN extends string>() {
  const SortableColumn = (
    { children, ...args }:
      React.PropsWithChildren<React.ComponentProps<SortableTh>>
    ,
  ) => (
    <SortableTh<COLUMN> {...args}>{children}</SortableTh>
  );

  const useBoundSorting = (
    initialColumn: COLUMN|"" = "",
    initialDirection: Direction = "asc",
  ) => useSorting<COLUMN>(initialColumn, initialDirection);

  SortableColumn.useSorting = useBoundSorting;
  return SortableColumn;
}

SortableTh.useSorting = useSorting;
SortableTh.bindColumns = bindColumns;
export default SortableTh;
