import {endpoints} from "app/backend/endpoints";

import {RouteResponse} from "../interception";

export const authGuiAgainstNodes = (
  nodes: Record<
    string,
    {password: string; dest_list: {addr: string; port: string}[]}
  >,
  response: RouteResponse | null = null,
) => ({
  url: endpoints.authGuiAgainstNodes.url,
  body: {
    data_json: JSON.stringify({nodes}),
  },
  ...(response ?? {
    json: {
      plaintext_error: "",
      node_auth_error: Object.keys(nodes).reduce<Record<string, 0>>(
        (nodesResponse, nodeName) => ({
          ...nodesResponse,
          [nodeName]: 0,
        }),
        {},
      ),
    },
  }),
});
