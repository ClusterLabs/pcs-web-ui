import * as t from "dev/responses/clusterStatus/tools";
import * as responses from "dev/responses";

import * as workflow from "test/workflow";
import { intercept, location, route, shortcuts } from "test/tools";

const { resources } = workflow.cluster;
export const agentData = responses.resourceAgentMetadata.ocfHeartbeatDummy;

export const resourceA = t.primitive("A", {
  meta_attr: [
    { id: "A_meta_one", name: "meta_one", value: "10" },
    { id: "A_meta_two", name: "meta_two", value: "20" },
  ],
  agentname: agentData.name,
});

export const clusterStatus = t.cluster("test-cluster", "ok", {
  resource_list: [resourceA],
});

export const doInterception = (additionalRouteList: intercept.Route[] = []) => {
  return shortcuts.interceptWithCluster({
    clusterStatus,
    additionalRouteList: [
      route.resourceAgentDescribeAgent({
        clusterName: clusterStatus.cluster_name,
        agentName: resourceA.agentname,
        agentData,
      }),
      ...additionalRouteList,
    ],
  });
};

export const openMetaAttrsTab = async () => {
  await page.goto(
    location.resource({
      clusterName: clusterStatus.cluster_name,
      resourceId: resourceA.id,
    }),
  );
  await resources.selectTab("meta");
};
