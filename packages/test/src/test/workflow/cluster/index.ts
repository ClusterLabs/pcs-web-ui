import {clusterAppTabList} from "app/view/cluster/";

import {selectors} from "test/tools";

export * as fenceDevices from "./fenceDevices";
export * as resources from "./resources";
export * as nodes from "./nodes";
export * as nvsets from "./nvsets";

type ClusterTabName = (typeof clusterAppTabList)[number];

export const selectTab = async (tabName: ClusterTabName) => {
  await page.click(selectors.dt("tabs cluster", tabName));
};
