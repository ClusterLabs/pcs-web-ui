import {LibClusterCommands} from "app/backend/endpoints";

import {RouteResponse} from "test/tools/interception";

import {libCluster} from "./libCluster";

export const stonithCreate = ({
  clusterName,
  fenceDeviceName,
  agentName,
  instanceAttrs,
  disabled,
  response,
  force,
}: {
  clusterName: string;
  fenceDeviceName: string;
  agentName: string;
  instanceAttrs: Extract<
    LibClusterCommands[number],
    {name: "stonith-create"}
  >["payload"]["instance_attributes"];
  disabled?: boolean;
  response?: RouteResponse;
  force?: boolean;
}) =>
  libCluster({
    clusterName,
    name: "stonith-create",
    payload: {
      stonith_id: fenceDeviceName,
      stonith_agent_name: agentName,
      operations: [],
      meta_attributes: {},
      instance_attributes: instanceAttrs,
      allow_absent_agent: force === undefined ? false : force,
      allow_invalid_operation: force === undefined ? false : force,
      allow_invalid_instance_attributes: force === undefined ? false : force,
      ensure_disabled: !!disabled,
    },
    response,
  });
