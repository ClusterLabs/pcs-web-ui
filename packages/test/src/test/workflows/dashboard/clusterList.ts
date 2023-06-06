export const waitForLoaded = async () =>
  await dataTest("dashboard.cluster-list").waitFor();
