import { endpoints } from "app/backend/endpoints";

export const login = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => ({
  url: endpoints.login.url,
  body: { username, password },
  text: "ajax-id-not-important",
});
