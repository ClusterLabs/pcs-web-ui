import { dt } from "./selectors";

export const fillAuthForm = async (
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

export const submitLoginForm = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  await page.type(dt("form-login", '[name="pf-login-username-id"]'), username);
  await page.type(dt("form-login", '[name="pf-login-password-id"]'), password);
  await page.click(dt("form-login", 'button[type="submit"]'));
};

export const waitForDashboardClusterListLoaded = async () => {
  await page.waitForSelector(dt("cluster-list"));
};

export const getDashboardClusterNameList = async () => {
  return await page.$$eval(dt("cluster-list", "^cluster "), clusterElements =>
    clusterElements.map(
      e => e.querySelector("[data-test='name']")?.textContent ?? "",
    ),
  );
};
