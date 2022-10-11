import { CallResult, endpoints, http, t, validate } from "./tools";

const { url, shape, params } = endpoints.authGuiAgainstNodes;

export const authGuiAgainstNodes = async (
  nodeMap: Parameters<typeof params>[0],
): CallResult<typeof shape> =>
  http.post(url, {
    params: params(nodeMap),
    validate: payload => {
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
