import * as t from "./tools";

export const ok = (clusterName: string) =>
  t.cluster(clusterName, "ok", {
    resource_list: [t.primitive("R1"), t.stonith("F1")],
  });
