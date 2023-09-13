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
    await fill(marks.login.form.username, username);
    await fill(marks.login.form.password, password);
    await click(marks.login.form.login);
  };
};
