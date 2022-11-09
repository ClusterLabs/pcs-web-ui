import {libCallCluster} from "./calls";

export type ClusterCall = Parameters<typeof libCallCluster>[0]["command"];

export type ClusterCallPayload<CALL_NAME extends ClusterCall["name"]> = Extract<
  ClusterCall,
  {name: CALL_NAME}
>["payload"];
