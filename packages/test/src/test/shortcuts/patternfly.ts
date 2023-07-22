export const select = async (
  mark: Mark,
  value: string | undefined,
  nth = 0,
) => {
  await click(mark);
  await locatorFor(mark).locator(`//*[text()="${value}"]`).nth(nth).click();
};

export const radioGroup = async (mark: Mark, value: string) => {
  await locatorFor(mark).locator(`//*[text()="${value}"]`).click();
};

export const toggle = async (mark: Mark) => {
  await locatorFor(mark).locator('//*[@class="pf-c-switch__toggle"]').click();
};

export const fieldError = (mark: Mark) =>
  locatorFor(mark).locator(
    'xpath=/following-sibling::*[contains(@class, "pf-m-error")]',
  );
