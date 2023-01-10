import {LibClusterCommands, endpoints} from "app/backend/endpoints";

import * as responses from "dev/responses";

import {RouteResponse} from "test/tools/interception";

export const libCluster = (
  props: LibClusterCommands[number] & {
    clusterName: string;
    response?: RouteResponse;
  },
) => {
  const {clusterName, payload, name: command} = props;
  const response: RouteResponse = props?.response ?? {
    json: responses.lib.success(),
  };
  return {
    url: endpoints.libCluster.url({clusterName, command}),
    payload,
    ...response,
  };
};

export type LibClusterCommandPayload = {
  -readonly [K in LibClusterCommands[number]["name"]]: Extract<
    LibClusterCommands[number],
    {name: K}
  >["payload"];
};
