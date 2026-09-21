import type {EnvType} from "./envType";

const protocol = process.env.PCSD_PROTOCOL_1 || "https";
const host = process.env.PCSD_HOST_1 || "";
const port = process.env.PCSD_PORT_1 || 5000;

const rootUrl = (envType: EnvType) => {
  if (envType === "cockpit") {
    return `${protocol}://${host}:${port}/ha-cluster/`;
  }

  if (envType === "mocked") {
    return `http://localhost:${port}/ui/`;
  }

  return `${protocol}://${host}:${port}/`;
};

export const getGoToCluster = (envType: EnvType) => {
  const url = rootUrl(envType);
  return async (
    tab?: ((tabs: typeof marks.clusterTabs) => Mark) | undefined,
  ) => {
    await page.goto(url);

    if (tab) {
      await click(tab(marks.clusterTabs));
    }
  };
};
