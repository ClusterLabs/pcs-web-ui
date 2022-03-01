export const select = async (xPathComponentSelector: string, value: string) => {
  await page.click(xPathComponentSelector);
  await page.click(`${xPathComponentSelector}//*[contains(text(), "${value}")]`);
};

export const radioGroup = async (context: string, value: string) => {
  await page.click(`${context}//*[contains(text(), "${value}")]`);
};

export const formSwitch = async (selector: string) => {
  await page.click(`${selector}/parent::*`);
};

export const hasFieldError = async (fieldXPath: string) => {
  await page.waitForSelector(
    `xpath=${fieldXPath}/following-sibling::*[contains(@class, "pf-m-error")]`,
  );
};
