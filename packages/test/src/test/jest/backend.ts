import {EnvType} from "./envType";

const protocol = process.env.PCSD_PROTOCOL_1 || "https";
const host = process.env.PCSD_HOST_1 || "";
const port = process.env.PCSD_PORT_1 || 2224;

const rootUrl = (envType: EnvType) => {
  console.log("ENV TYPE", envType);
  if (envType === "cockpit") {
    return `${protocol}://${host}:${port}/ha-cluster/`;
  }

  if (envType === "mocked") {
    return "http://localhost:3000/ui/";
  }

  return `${protocol}://${host}:${port}/`;
};

export const getBackend = (envType: EnvType) => ({
  protocol,
  host,
  port,
  rootUrl: rootUrl(envType),
});
