import type {Locator} from "playwright";

type Search<MARK_PART extends Mark> = Mark | ((markPart: MARK_PART) => Mark);

type MarkPure = {path: string; locator: Locator};
type MarkName = MarkPure & {name: MarkPure};
type MarkId = MarkPure & {id: MarkPure};

type SearchFn<M extends MarkPure> = <S extends Search<M> | Search<M>[]>(
  search: S,
) => S extends Search<M> ? Locator : Locator[];

const search = <M extends Mark>(mark: Search<M>, markPart: M) =>
  locatorFor(typeof mark === "function" ? mark(markPart) : mark);

const ancestor = (mark: {path: string}) =>
  `xpath=/ancestor::node()[@data-test="${mark.path}"]`;

function findByRoot<M extends MarkPure>(
  root: Locator,
  itemMark: M,
  searchExp?: Search<M> | Search<M>[],
) {
  const findInside = (searchExp: Search<M> | Search<M>[]) =>
    Array.isArray(searchExp)
      ? searchExp.map(se => root.locator(search(se, itemMark)))
      : root.locator(search(searchExp, itemMark));

  return searchExp !== undefined ? findInside(searchExp) : findInside;
}

function find<M extends MarkPure>(
  itemMark: M,
  searchKeyExp: Search<M>,
  key: string,
  searchExp?: Search<M> | Search<M>[],
) {
  return findByRoot(
    search(searchKeyExp, itemMark)
      .getByText(key, {exact: true})
      .locator(ancestor(itemMark)),
    itemMark,
    searchExp,
  );
}

export function byKey<M extends MarkPure, S extends Search<M> | Search<M>[]>(
  itemMark: M,
  keyExp: Search<M>,
  key: string,
  searchExp: S,
): S extends Search<M> ? Locator : Locator[];
export function byKey<M extends MarkPure>(
  itemMark: M,
  keyExp: Search<M>,
  key: string,
): SearchFn<M>;
export function byKey<M extends MarkPure>(
  itemMark: M,
  keyExp: Search<M>,
  key: string,
  searchExp?: Search<M> | Search<M>[],
) {
  return find(itemMark, keyExp, key, searchExp);
}

export function byName<M extends MarkName>(
  itemMark: M,
  name: string,
): SearchFn<M>;
export function byName<M extends MarkName, S extends Search<M> | Search<M>[]>(
  itemMark: M,
  name: string,
  searchExp: S,
): S extends Search<M> ? Locator : Locator[];
export function byName<M extends MarkName>(
  itemMark: M,
  name: string,
  searchExp?: Search<M> | Search<M>[],
) {
  return find(itemMark, m => m.name, name, searchExp);
}

export function byId<M extends MarkId>(itemMark: M, id: string): SearchFn<M>;
export function byId<M extends MarkId, S extends Search<M> | Search<M>[]>(
  itemMark: M,
  id: string,
  searchExp: S,
): S extends Search<M> ? Locator : Locator[];
export function byId<M extends MarkId>(
  itemMark: M,
  id: string,
  searchExp?: Search<M> | Search<M>[],
) {
  return find(itemMark, m => m.id, id, searchExp);
}

export function byIndex<M extends MarkPure>(
  itemMark: M,
  index: number,
): SearchFn<M>;
export function byIndex<M extends MarkPure, S extends Search<M> | Search<M>[]>(
  itemMark: M,
  index: number,
  searchExp: S,
): S extends Search<M> ? Locator : Locator[];
export function byIndex<M extends MarkPure>(
  itemMark: M,
  index: number,
  searchExp?: Search<M> | Search<M>[],
) {
  return findByRoot(itemMark.locator.nth(index), itemMark, searchExp);
}
