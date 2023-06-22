import {Locator} from "playwright";

export const select = async (
  withLocator: {locator: Locator},
  value: string | undefined,
) => {
  await click(withLocator);
  await withLocator.locator.locator(`//*[text()="${value}"]`).click();
};

export const radioGroup = async (
  withLocator: {locator: Locator},
  value: string,
) => {
  await withLocator.locator.locator(`//*[text()="${value}"]`).click();
};
