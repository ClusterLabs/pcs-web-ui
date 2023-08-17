import {Locator} from "playwright";

type itemMark = {path: string; locator: Locator};

export type SearchExp<MARK_PART extends Mark> =
  | Mark
  | ((markPart: MARK_PART) => Mark);

export const search = <MARK_PART extends Mark>(
  mark: SearchExp<MARK_PART>,
  markPart: MARK_PART,
) => locatorFor(typeof mark === "function" ? mark(markPart) : mark);

const ancestor = (mark: {path: string}) =>
  `xpath=/ancestor::node()[@data-test="${mark.path}"]`;

const getLocator =
  <ITEM_MARK extends itemMark>(itemMark: ITEM_MARK, theItem: Locator) =>
  (searchExp?: SearchExp<ITEM_MARK>) =>
    searchExp === undefined
      ? theItem
      : theItem.locator(search(searchExp, itemMark));

export const item = <ITEM_MARK extends itemMark>(itemMark: ITEM_MARK) => ({
  byKey: (searchExp: SearchExp<ITEM_MARK>, key: string) => {
    const theItem = search(searchExp, itemMark)
      .getByText(key, {exact: true})
      .locator(ancestor(itemMark));

    return {
      locator: getLocator(itemMark, theItem),

      thereIs: async (searchExp: SearchExp<ITEM_MARK>, value: string) => {
        expect(
          (
            await locatorFor(
              theItem.locator(search(searchExp, itemMark)),
            ).textContent()
          )?.trim(),
        ).toEqual(value);
      },
    };
  },
  byIndex: (index: number) => ({
    locator: getLocator(itemMark, itemMark.locator.nth(index)),
  }),
});
