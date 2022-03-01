import { dt } from "test/tools/selectors";

export const submitForm = async ({
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
