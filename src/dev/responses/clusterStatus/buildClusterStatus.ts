import * as t from "./tools";

export const ok = (clusterName: string) =>
  t.cluster(clusterName, "ok", {
    resource_list: [
      t.primitive("R1", {
        utilization: [
          { id: "R1_test_one", name: "test_one", value: "10" },
          { id: "R1_test_two", name: "test_two", value: "20" },
        ],
      }),
      t.stonith("F1"),
    ],
  });
