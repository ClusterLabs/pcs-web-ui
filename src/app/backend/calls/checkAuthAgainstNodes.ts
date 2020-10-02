import { api, http, t, validate } from "app/backend/tools";

const shape = t.record(
  t.string,
  t.keyof({
    Online: null,
    Offline: null,
    "Unable to authenticate": null,
  }),
);

export const checkAuthAgainstNodes = async (
  nodeList: string[],
): api.CallResult<typeof shape> => {
  const uniqueNodeList = Array.from(new Set(nodeList));

  return http.get("/manage/check_auth_against_nodes", {
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
