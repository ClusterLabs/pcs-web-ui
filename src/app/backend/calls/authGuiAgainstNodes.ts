import { api, http, t, validate } from "app/backend/tools";

const shape = t.type({
  node_auth_error: t.record(t.string, t.number),
});

export const authGuiAgainstNodes: api.CallShape<typeof shape> = async (
  nodeMap: Record<
    string,
    {
      password: string;
      dest_list: { addr: string; port: string }[];
    }
  >,
) =>
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
