import * as cs from "dev/responses/clusterStatus/tools";

import * as shortcuts from "test/shortcuts";
import {intercept} from "test/tools";

const {interceptWithCluster} = intercept.shortcuts;

const {fenceDevices, fenceDevicesToolbar} = marks.cluster;

export const clusterName = "test-cluster";

export const interceptWithStonith = (
  props: {
    fenceDeviceIdList?: string[];
    additionalRouteList?: Parameters<
      typeof interceptWithCluster
    >[0]["additionalRouteList"];
  } = {fenceDeviceIdList: [], additionalRouteList: []},
) => {
  const fenceDeviceIdList = props.fenceDeviceIdList ?? [];
  return interceptWithCluster({
    clusterStatus: cs.cluster(clusterName, "ok", {
      resource_list: fenceDeviceIdList.map(id => cs.stonith(id)),
    }),
    ...(props.additionalRouteList
      ? {additionalRouteList: props.additionalRouteList}
      : {}),
    optionalRoutes: ["agentFenceApc"],
  });
};

export const toolbar = shortcuts.toolbar(fenceDevicesToolbar);

export const goToFenceDevices = async () => {
  await shortcuts.dashboard.goToCluster(clusterName, tabs => tabs.fenceDevices);
};

export const fenceDeviceListItem = (fenceDeviceId: string) =>
  shortcuts.common
    .item(fenceDevices.list.item)
    .byKey(fenceDevices.list.item.id, fenceDeviceId);

export const openFenceDevice = async (fenceDeviceId: string) => {
  await click(
    fenceDeviceListItem(fenceDeviceId).locator(fenceDevices.list.item.id),
  );
};
