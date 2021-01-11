import { endpoint } from "./endpoint";

export const login = endpoint({
  url: "/ui/login",
  method: "post",
  shape: undefined,
});
