import { lib } from "app/backend/tools";

export const resourceCreate = async ({
  clusterUrlName,
  resourceName,
  agentName,
  instanceAttrs,
  disabled,
}: {
  clusterUrlName: string;
  resourceName: string;
  agentName: string;
  instanceAttrs: Record<string, string>;
  disabled: boolean;
}) =>
  lib.callCluster({
    clusterUrlName,
    commandUrlName: "resource-create",
    payload: {
      resource_id: resourceName,
      resource_agent_name: agentName,
      operation_list: [],
      meta_attributes: {},
      instance_attributes: instanceAttrs,
      ensure_disabled: disabled,
    },
  });
