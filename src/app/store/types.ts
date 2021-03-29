import { api, libCallCluster } from "app/backend";

export type LibReport = api.PayloadOf<
  typeof libCallCluster
>["report_list"][number];
