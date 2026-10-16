import type {RouteResponse} from "../mock";

import {type LibClusterCommandPayload, libCluster} from "./libCluster";

type ResourceCreatePayload = LibClusterCommandPayload["resource-create"];

export const resourceCreate = ({
  resourceId,
  agentName,
  instanceAttrs,
  disabled,
  response,
  force,
}: {
  resourceId: string;
  agentName: string;
  instanceAttrs: ResourceCreatePayload["instance_attributes"];
  disabled?: boolean;
  response?: RouteResponse;
  force?: boolean;
}) =>
  libCluster({
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
