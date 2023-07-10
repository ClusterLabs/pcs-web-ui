export const textIs = async (mark: Mark, expectedText: string) => {
  const locator = isLocator(mark) ? mark : mark.locator;
  expect((await locator.textContent())?.trim()).toEqual(expectedText);
};
