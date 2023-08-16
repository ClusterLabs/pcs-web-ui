type EnvType = "cockpit" | "standalone" | "mocked";

export const getLogin = (envType: EnvType) => {
  if (envType === "cockpit") {
    return async (username: string, password: string) => {
      // Looks like the cockpit wipe out username + password if we are too fast.
      await page.waitForTimeout(200);
      await page.type('//*[@id="login-user-input"]', username);
      await page.type('//*[@id="login-password-input"]', password);
      await page.click('//*[@id="login-button"]');
    };
  }

  return async (username: string, password: string) => {
    const loginForm = '//*[@data-test="login.form"]';
    await page.type(`${loginForm}//*[@name="pf-login-username-id"]`, username);
    await page.type(`${loginForm}//*[@name="pf-login-password-id"]`, password);
    await page.click(`${loginForm}//button[@type="submit"]`);
  };
};
