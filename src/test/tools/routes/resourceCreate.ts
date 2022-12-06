import {LibClusterCommands} from "app/backend/endpoints";

import {RouteResponse} from "test/tools/interception";

import {libCluster} from "./libCluster";

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
  instanceAttrs: Extract<
    LibClusterCommands[number],
    {name: "resource-create"}
  >["payload"]["instance_attributes"];
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
