import {Locator, Page} from "playwright";

type LocatorArgs = Parameters<Page["locator"]>;

export const getLocator =
  (environmentType: "cockpit" | "standalone") =>
  (...args: LocatorArgs): Locator => {
    if (environmentType === "cockpit") {
      return page.frameLocator('[name$="/ha-cluster"]').locator(...args);
    }
    return page.locator(...args);
  };
