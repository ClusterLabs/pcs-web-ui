import React from "react";
import {Th} from "@patternfly/react-table";

type Direction = "asc" | "desc";

interface SortState<COLUMN> {
  column: COLUMN;
  columnIndex: number;
  direction: Direction;
  change: (_ci: number, _d: Direction) => void;
  columnIndexByName: (name: COLUMN) => number;
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
  return (
    <Th
      sort={{
        columnIndex: sortState.columnIndexByName(columnName),
        sortBy: {
          index: sortState.columnIndex,
          direction: sortState.direction,
          defaultDirection: startDesc ? "desc" : "asc",
        },
        onSort: (_event, index, direction) =>
          sortState.change(index, direction),
      }}
      {...rest}
    >
      {children}
    </Th>
  );
}

function useSorting<COLUMN extends string>(
  columnList: readonly COLUMN[],
  initialColumn?: COLUMN,
  initialDirection: Direction = "asc",
) {
  const [columnIndex, setColumnIndex] = React.useState(
    initialColumn ? columnList.indexOf(initialColumn) : 0,
  );
  const [direction, setDirection] = React.useState(initialDirection);

  const column = React.useMemo(
    () => columnList[columnIndex],
    [columnList, columnIndex],
  );

  const compareItems = (
    // biome-ignore lint/suspicious/noExplicitAny: no worth to improve any now
    compareByColumn: (_column: COLUMN) => (_a: any, _b: any) => number,
  ) => {
    const compare = compareByColumn(column);
    // biome-ignore lint/suspicious/noExplicitAny: no worth to improve any now
    return direction === "desc" ? (a: any, b: any) => compare(b, a) : compare;
  };

  const change = React.useCallback(
    (columnIndex: number, sortDirection: Direction) => {
      setColumnIndex(columnIndex);
      setDirection(sortDirection);
    },
    [],
  );
  const sortState: SortState<COLUMN> = {
    column,
    columnIndex,
    direction,
    change,
    columnIndexByName: (name: COLUMN) => columnList.indexOf(name),
  };
  return {sortState, compareItems};
}

SortableTh.useSorting = useSorting;
export {SortableTh};
