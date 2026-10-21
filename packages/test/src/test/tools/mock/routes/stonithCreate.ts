import type {RouteResponse} from "../mock";

import {type LibClusterCommandPayload, libCluster} from "./libCluster";

export const stonithCreate = ({
  fenceDeviceName,
  agentName,
  instanceAttrs,
  disabled,
  response,
  force,
}: {
  fenceDeviceName: string;
  agentName: string;
  instanceAttrs: LibClusterCommandPayload["stonith-create"]["instance_attributes"];
  disabled?: boolean;
  response?: RouteResponse;
  force?: boolean;
}) =>
  libCluster({
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
