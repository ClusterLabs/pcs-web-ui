import * as t from "dev/responses/clusterStatus/tools";

import * as shortcuts from "test/shortcuts";

const clusterName = "test-cluster";

export const clusterStatus = t.cluster(clusterName, "ok", {
  resource_list: [t.primitive("A"), t.primitive("B")],
});

export const goToConstraints = async () => {
  await goToCluster(clusterStatus.cluster_name, tabs => tabs.constraints);
};

export const toolbar = shortcuts.toolbar(marks.cluster.constraintsToolbar);
