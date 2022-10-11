export const getConfirmDialog = (name: string) => {
  const dialogSelector = `//*[@data-test="confirm ${name}"]/parent::*`;
  return {
    isDisplayed: async () => await page.waitForSelector(dialogSelector),

    isHidden: async () =>
      expect((await page.$$(dialogSelector)).length).toEqual(0),

    cancel: async () =>
      await page.click(`${dialogSelector}//*[@data-test="cancel"]`),

    confirm: async () =>
      await page.click(`${dialogSelector}//*[@data-test="confirm"]`),
  };
};
