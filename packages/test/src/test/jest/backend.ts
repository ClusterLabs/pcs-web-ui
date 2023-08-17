import {EnvType} from "./envType";

const protocol = process.env.PCSD_PROTOCOL_1 || "https";
const host = process.env.PCSD_HOST_1 || "";
const port = process.env.PCSD_PORT_1 || 2224;

const rootUrl = (envType: EnvType) => {
  if (envType === "cockpit") {
    return `${protocol}://${host}:${port}/ha-cluster/`;
  }

  if (envType === "mocked") {
    return "http://localhost:3000/ui/";
  }

  return `${protocol}://${host}:${port}/`;
};

export const getGoToDashboard = (envType: EnvType) => {
  const url = rootUrl(envType);
  return async () => {
    await page.goto(url);
  };
};

export const getGoToCluster = (envType: EnvType) => {
  const url = rootUrl(envType);
  return async (
    clusterName: string,
    tab?: ((tabs: typeof marks.cluster.tabs) => Mark) | undefined,
  ) => {
    await page.goto(url);

    await click(
      marks.dashboard.clusterList.cluster.name.locator.getByText(clusterName, {
        exact: true,
      }),
    );

    if (tab) {
      await click(tab(marks.cluster.tabs));
    }
  };
};
