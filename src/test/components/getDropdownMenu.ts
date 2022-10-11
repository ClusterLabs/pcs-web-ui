import { dt } from "test/tools/selectors";

export const getDropdownMenu = (...dataTestPath: string[]) => {
  const open = async () =>
    await page.click(dt(...[...dataTestPath, '[aria-label="Actions"]']));

  const clickItem = async (itemDataTest: string) =>
    await page.click(dt(itemDataTest));

  return {
    open,
    clickItem,
    launchItem: async (itemDataTest: string) => {
      await open();
      await clickItem(itemDataTest);
    },
  };
};
