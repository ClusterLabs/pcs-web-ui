export type SearchExp<MARK_PART extends Mark> =
  | Mark
  | ((markPart: MARK_PART) => Mark);

export const search = <MARK_PART extends Mark>(
  mark: SearchExp<MARK_PART>,
  markPart: MARK_PART,
) => locatorFor(typeof mark === "function" ? mark(markPart) : mark);

const ancestor = (mark: {path: string}) =>
  `xpath=/ancestor::node()[@data-test="${mark.path}"]`;

export const item = (itemMark: {path: string}) => ({
  byKey: (keyMark: Mark, key: string) => {
    const theItem = locatorFor(keyMark)
      .getByText(key)
      .locator(ancestor(itemMark));

    return {
      locator: (mark: Mark) => theItem.locator(locatorFor(mark)),
    };
  },
});
