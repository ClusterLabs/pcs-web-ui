import { endpoints } from "app/backend/endpoints";

export const logout = () => ({
  url: endpoints.logout.url,
  text: "OK",
});
