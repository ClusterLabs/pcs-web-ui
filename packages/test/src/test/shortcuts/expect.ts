export const textIs = async (mark: Mark, expectedText: string) => {
  const locator = isLocator(mark) ? mark : mark.locator;
  expect((await locator.textContent())?.trim()).toEqual(expectedText);
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
