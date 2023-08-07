import {textIs} from "test/shortcuts/expect";

import * as importedClusters from "./importedClusters";

export {importedClusters};

export const goToDashboard = async () => {
  await page.goto(backend.rootUrl);
};

export const goToCluster = async (
  clusterName: string,
  tab?: ((tabs: typeof marks.cluster.tabs) => Mark) | undefined,
) => {
  await goToDashboard();

  const theCluster = importedClusters.inCluster(clusterName);
  await isVisible(theCluster.get(cluster => cluster.loaded));
  await click(theCluster.get(cluster => cluster.name));
  await textIs(marks.cluster.breadcrumbs.clusterName, clusterName);

  if (tab) {
    await click(tab(marks.cluster.tabs));
  }
};
