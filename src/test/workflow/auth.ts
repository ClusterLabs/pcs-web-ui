import { dt } from "test/tools/selectors";

export const fillForm = async (
  nodeName: string,
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
  await page.type(dt(formSelector, `auth-node-${nodeName}-password`), password);
  await page.type(dt(formSelector, `auth-node-${nodeName}-address`), addr);
  await page.type(dt(formSelector, `auth-node-${nodeName}-port`), port);
};
