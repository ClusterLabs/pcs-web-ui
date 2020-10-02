import { api, http, t } from "app/backend/tools";

const shape = t.type({
  cluster_list: t.array(
    t.type({
      name: t.string,
    }),
  ),
});

export const importedClusterList = async (): api.CallResult<typeof shape> =>
  http.get("/imported-cluster-list", { shape });
