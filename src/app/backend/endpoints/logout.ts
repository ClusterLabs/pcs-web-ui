import { endpoint } from "./endpoint";

export const logout = endpoint({
  url: "/ui/logout",
  method: "get",
  shape: undefined,
});
