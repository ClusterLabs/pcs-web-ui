import {Locator} from "playwright";

export const select = async (
  mark: Mark,
  value: string | undefined,
  nth = 0,
) => {
  await click(mark);
  await locatorFor(mark).locator(`//*[text()="${value}"]`).nth(nth).click();
};

export const radioGroup = async (
  withLocator: {locator: Locator},
  value: string,
) => {
  await withLocator.locator.locator(`//*[text()="${value}"]`).click();
};
