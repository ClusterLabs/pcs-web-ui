import React from "react";
import {
  ArrowsAltVIcon,
  LongArrowAltDownIcon,
  LongArrowAltUpIcon,
} from "@patternfly/react-icons";

type Direction = "asc" | "desc";

interface SortState<COLUMN> {
  column: COLUMN | "";
  direction: Direction;
  change: (_c: COLUMN, _d: Direction) => void;
}

function SortableTh<C extends string>({
  children,
  sortState,
  columnName,
  startDesc = false,
  ...rest
}: React.PropsWithChildren<{
  sortState: SortState<C>;
  columnName: C;
  startDesc?: boolean;
}>) {
  const classNameList = ["pf-c-table__sort"];
  if (sortState.column === columnName) {
    classNameList.push("pf-m-selected");
  }
  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <th className={classNameList.join(" ")} {...rest}>
      <button
        type="button"
        className="pf-c-table__button"
        onClick={() => {
          const firstDirection = startDesc ? "desc" : "asc";
          const nextDirection = startDesc ? "asc" : "desc";
          sortState.change(
            columnName,
            sortState.column === columnName
              && sortState.direction === firstDirection
              ? nextDirection
              : firstDirection,
          );
        }}
      >
        {children}
        <span className="pf-c-table__sort-indicator">
          {sortState.column !== columnName && <ArrowsAltVIcon />}
          {sortState.column === columnName && sortState.direction === "asc" && (
            <LongArrowAltUpIcon />
          )}
          {sortState.column === columnName
            && sortState.direction === "desc" && <LongArrowAltDownIcon />}
        </span>
      </button>
    </th>
  );
}

function useSorting<COLUMN extends string>(
  initialColumn: COLUMN | "" = "",
  initialDirection: Direction = "asc",
) {
  const [column, setColumn] = React.useState(initialColumn);
  const [direction, setDirection] = React.useState(initialDirection);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const compareItems = (
    compareByColumn: (_column: COLUMN | "") => (_a: any, _b: any) => number,
  ) => {
    const compare = compareByColumn(column);
    return direction === "desc" ? (a: any, b: any) => compare(b, a) : compare;
  };

  const change = React.useCallback(
    (columnName: COLUMN, sortDirection: Direction) => {
      setColumn(columnName);
      setDirection(sortDirection);
    },
    [setDirection, setColumn],
  );
  const sortState: SortState<COLUMN> = { column, direction, change };
  return { sortState, compareItems };
}

SortableTh.useSorting = useSorting;
export { SortableTh };
