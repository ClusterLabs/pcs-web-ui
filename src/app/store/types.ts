import {api, libCallCluster} from "app/backend";

export type LibReport = Extract<
  api.PayloadOf<typeof libCallCluster>,
  {status: "success" | "error"}
>["report_list"][number];
