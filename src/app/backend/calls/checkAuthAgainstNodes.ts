import { CallResult, endpoints, http, t, validate } from "app/backend/tools";

const { url, shape } = endpoints.checkAuthAgainstNodes;

export const checkAuthAgainstNodes = async (
  nodeList: string[],
): CallResult<typeof shape> => {
  const uniqueNodeList = Array.from(new Set(nodeList));

  return http.get(url, {
    params: uniqueNodeList.map(node => ["node_list[]", node]),
    validate: (payload) => {
      let errors = validate.shape(payload, shape);
      if (errors.length > 0) {
        return errors;
      }

      const nodeResultMap: t.TypeOf<typeof shape> = payload;
      errors = validate.sameNodes(uniqueNodeList, Object.keys(nodeResultMap));
      if (errors.length > 0) {
        return errors;
      }

      return [];
    },
  });
};
