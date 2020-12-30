import { api, http, t, validate } from "app/backend/tools";

import * as types from "../types";

const shape = types.authGuiAgainstNodes.TApiAuthGuiAgainstNodes;

export const authGuiAgainstNodes = async (
  nodeMap: Record<
    string,
    {
      password: string;
      dest_list: { addr: string; port: string }[];
    }
  >,
): api.CallResult<typeof shape> =>
  http.post("/manage/auth_gui_against_nodes", {
    params: [["data_json", JSON.stringify({ nodes: nodeMap })]],
    validate: (payload) => {
      const errors = validate.shape(payload, shape);
      if (errors.length > 0) {
        return errors;
      }

      const returnedNodeMap: t.TypeOf<typeof shape> = payload;
      return validate.sameNodes(
        Object.keys(nodeMap),
        Object.keys(returnedNodeMap.node_auth_error),
      );
    },
  });
