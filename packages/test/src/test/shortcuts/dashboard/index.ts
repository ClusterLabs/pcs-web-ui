import {textIs} from "test/shortcuts/expect";

import * as importedClusters from "./importedClusters";

export {importedClusters};

export const goToCluster = async (
  clusterName: string,
  tab?: ((tabs: typeof marks.clusterDetail.tabs) => Mark) | undefined,
) => {
  await page.goto(backend.rootUrl);

  const theCluster = importedClusters.inCluster(clusterName);
  await isVisible(theCluster.get(cluster => cluster.loaded));
  await click(theCluster.get(cluster => cluster.name));
  await textIs(marks.clusterDetail.breadcrumbs.clusterName, clusterName);

  if (tab) {
    await click(tab(marks.clusterDetail.tabs));
  }
};
