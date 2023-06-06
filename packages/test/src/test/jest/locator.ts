import {Locator, Page} from "playwright";

import {Path} from "app/view/dataTest";

type LocatorArgs = Parameters<Page["locator"]>;

const dataTestToXpath = (path: Path) =>
  "//*"
  + path
    .split(".")
    .map(value => `[@data-test="${value}"]`)
    .join("//*");

export const getLocator =
  (environmentType: "cockpit" | "standalone") =>
  (...args: LocatorArgs): Locator => {
    if (environmentType === "cockpit") {
      return page.frameLocator('[name$="/ha-cluster"]').locator(...args);
    }
    return page.locator(...args);
  };

export const getDataTest =
  (environmentType: "cockpit" | "standalone") =>
  (path: Path, options: LocatorArgs[1] = undefined) =>
    getLocator(environmentType)(dataTestToXpath(path), options);
