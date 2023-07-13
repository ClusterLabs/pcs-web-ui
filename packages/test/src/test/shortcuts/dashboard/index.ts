import * as importedClusters from "./importedClusters";

export {importedClusters};

export const goToCluster = async (clusterName: string) => {
  await page.goto(backend.rootUrl);

  const theCluster = importedClusters.inCluster(clusterName);
  await isVisible(theCluster.get(cluster => cluster.loaded));
  await click(theCluster.get(cluster => cluster.name));
};
