import * as t from "dev/responses/clusterStatus/tools";

const clusterName = "test-cluster";

export const clusterStatus = t.cluster(clusterName, "ok", {
  resource_list: [t.primitive("A"), t.primitive("B")],
});

export const goToConstraints = async () => {
  await goToCluster(clusterStatus.cluster_name, tabs => tabs.constraints);
};
