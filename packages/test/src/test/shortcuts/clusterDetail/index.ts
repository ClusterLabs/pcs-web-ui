import {inCluster} from "../dashboard/clusterList";

const {cluster} = app.dashboard.clusterList;

export const goToCluster = async (clusterName: string) => {
  const inTheCluster = inCluster(clusterName);

  await page.goto(backend.rootUrl);
  await isVisible(inTheCluster(cluster.loaded));
  await click(inTheCluster(cluster.name));
};
