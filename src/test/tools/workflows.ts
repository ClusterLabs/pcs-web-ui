import { dt } from "./selectors";

export const sendAuthForm = async (
  contextSelector: string,
  password: string,
  addr: string,
  port: string,
) => {
  const formSelector = dt(contextSelector, "form-auth-node");
  await page.waitForSelector(formSelector);
  await page.click(
    `${dt(formSelector, "use-custom-address")} .pf-c-switch__toggle`,
  );
  await page.type(dt(formSelector, "password"), password);
  await page.type(dt(formSelector, "address"), addr);
  await page.type(dt(formSelector, "port"), port);
  await page.click(dt(formSelector, "auth-node"));
};
