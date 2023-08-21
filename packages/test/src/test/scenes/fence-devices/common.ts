import * as cs from "dev/responses/clusterStatus/tools";

import {mock} from "test/tools";

export const clusterName = "test-cluster";

export const mockWithStonith = (
  props: {
    fenceDeviceIdList?: string[];
    additionalRouteList?: Parameters<
      typeof mock.shortcuts.withCluster
    >[0]["additionalRouteList"];
  } = {fenceDeviceIdList: [], additionalRouteList: []},
) => {
  const fenceDeviceIdList = props.fenceDeviceIdList ?? [];
  return mock.shortcuts.withCluster({
    clusterStatus: cs.cluster(clusterName, "ok", {
      resource_list: fenceDeviceIdList.map(id => cs.stonith(id)),
    }),
    ...(props.additionalRouteList
      ? {additionalRouteList: props.additionalRouteList}
      : {}),
    optionalRoutes: ["agentFenceApc"],
  });
};

export const goToFenceDevices = async () => {
  await goToCluster(clusterName, tabs => tabs.fenceDevices);
};

export const openFenceDevice = async (fenceDeviceId: string) => {
  await click(
    item.byId(marks.cluster.fenceDevices.list.item, fenceDeviceId, f => f.id),
  );
};
