const protocol = process.env.PCSD_PROTOCOL_1 || "https";
const host = process.env.PCSD_HOST_1 || "";
const port = process.env.PCSD_PORT_1 || 2224;

const rootUrl = (environmentType: "cockpit" | "standalone") => {
  if (environmentType === "cockpit") {
    return `${protocol}://${host}:${port}/ha-cluster/`;
  }

  return `${protocol}://${host}:${port}/`;
};

export const getBackend = (environmentType: "cockpit" | "standalone") => ({
  protocol,
  host,
  port,
  rootUrl: rootUrl(environmentType),
});
