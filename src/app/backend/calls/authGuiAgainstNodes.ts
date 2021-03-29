import { CallResult, endpoints, http, t, validate } from "./tools";

const { url, shape } = endpoints.authGuiAgainstNodes;

type Node = {
  password: string;
  dest_list: { addr: string; port: string }[];
};

export const authGuiAgainstNodes = async (
  nodeMap: Record<string, Node>,
): CallResult<typeof shape> =>
  http.post(url, {
    params: [["data_json", JSON.stringify({ nodes: nodeMap })]],
    validate: (payload) => {
      const errors = validate.shape(payload, shape);
      if (errors.length > 0) {
        return errors;
      }

      const p: t.TypeOf<typeof shape> = payload;
      if ("node_auth_error" in p && p.node_auth_error) {
        return validate.sameNodes(
          Object.keys(nodeMap),
          Object.keys(p.node_auth_error),
        );
      }
      return [];
    },
  });
