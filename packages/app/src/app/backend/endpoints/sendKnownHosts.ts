import {endpoint} from "./endpoint";

export const sendKnownHosts = endpoint({
  url: "/managec/send-known-hosts",
  method: "post",
  params: undefined,
  payload: undefined,
  validate: undefined,
  shape: undefined,
});
