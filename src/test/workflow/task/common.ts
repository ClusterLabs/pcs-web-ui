import { dt } from "test/tools/selectors";

export const assertReview = async (
  contextSelector: string,
  nameValueMap: Record<string, string>,
) => {
  await page.waitForSelector(dt(contextSelector));
  Object.keys(nameValueMap).forEach(async (name) => {
    const foundValues = await page.$$eval(
      dt(contextSelector, `${name}-review-value`),
      el => el.map(e => (e as HTMLElement).innerText),
    );

    if (foundValues.length !== 1) {
      expect(`but found ${foundValues.length} occurences`).toEqual(
        `Exepected 1 occurence of "${name}" in review`,
      );
    }
    if (foundValues[0] !== nameValueMap[name]) {
      expect(`but found: "${foundValues[0]}"`).toEqual(
        `For review "${name}" expected value "${nameValueMap[name]}"`,
      );
    }
  });
};
