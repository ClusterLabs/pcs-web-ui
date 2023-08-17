import {Locator} from "playwright";

import {item} from "test/shortcuts/common";

export const textIs = async (mark: Mark, expectedText: string) => {
  expect((await locatorFor(mark).textContent())?.trim()).toEqual(expectedText);
};

export const expectKeysAre = async (mark: Mark, keys: string[]) => {
  expect(
    await locatorFor(mark).evaluateAll((elements: HTMLElement[]) =>
      elements.map(e => e.innerText),
    ),
  ).toEqual(keys);
};

export const countIs = async (mark: Mark, count: number) => {
  expect(await locatorFor(mark).count()).toEqual(count);
};

export const inTaskReview = async (pairs: [Mark, string][]) => {
  for (let i = 0; i < pairs.length; i++) {
    const [mark, expectedValue] = pairs[i];
    expect(await locatorFor(mark).innerText()).toEqual(expectedValue);
  }
};

type PureMark = {path: string; locator: Locator};

export const nvPairIs = async (
  pairMark: PureMark & {
    name: PureMark;
    value: PureMark;
  },
  name: string,
  value: string,
) => {
  await textIs(
    item(pairMark).byKey(pairMark.name, name).locator(pairMark.value),
    value,
  );
};
