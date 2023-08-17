export * as mock from "./mock";
export * as assert from "./assert";

export const goToDashboard = async () => {
  await page.goto(backend.rootUrl);
};

export const goToCluster = async (
  clusterName: string,
  tab?: ((tabs: typeof marks.cluster.tabs) => Mark) | undefined,
) => {
  await goToDashboard();

  await click(
    marks.dashboard.clusterList.cluster.name.locator.getByText(clusterName, {
      exact: true,
    }),
  );

  if (tab) {
    await click(tab(marks.cluster.tabs));
  }
};
