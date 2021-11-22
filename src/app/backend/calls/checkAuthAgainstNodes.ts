import { CallResult, endpoints, http, t, validate } from "./tools";

const { url, shape, params } = endpoints.checkAuthAgainstNodes;

export const checkAuthAgainstNodes = async (
  nodeList: string[],
): CallResult<typeof shape> => {
  const uniqueNodeList = Array.from(new Set(nodeList));

  return http.get(url, {
    params: params(uniqueNodeList),
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
