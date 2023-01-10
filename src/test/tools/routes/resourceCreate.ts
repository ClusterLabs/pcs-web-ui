import {RouteResponse} from "test/tools/interception";

import {LibClusterCommandPayload, libCluster} from "./libCluster";

type ResourceCreatePayload = LibClusterCommandPayload["resource-create"];

export const resourceCreate = ({
  clusterName,
  resourceId,
  agentName,
  instanceAttrs,
  disabled,
  response,
  force,
}: {
  clusterName: string;
  resourceId: string;
  agentName: string;
  instanceAttrs: ResourceCreatePayload["instance_attributes"];
  disabled?: boolean;
  response?: RouteResponse;
  force?: boolean;
}) =>
  libCluster({
    clusterName,
    name: "resource-create",
    payload: {
      resource_id: resourceId,
      resource_agent_name: agentName,
      operation_list: [],
      meta_attributes: {},
      instance_attributes: instanceAttrs,
      allow_absent_agent: force === undefined ? false : force,
      allow_not_suitable_command: force === undefined ? false : force,
      allow_invalid_operation: force === undefined ? false : force,
      allow_invalid_instance_attributes: force === undefined ? false : force,
      ensure_disabled: !!disabled,
    },
    response,
  });
