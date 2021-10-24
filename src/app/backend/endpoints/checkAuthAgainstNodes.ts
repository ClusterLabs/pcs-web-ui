import * as t from "io-ts";

import { endpoint } from "./endpoint";

export const checkAuthAgainstNodes = endpoint({
  url: "/manage/check_auth_against_nodes",
  method: "get",
  params: (nodeNameList: string[]): [string, string][] =>
    nodeNameList.map(node => ["node_list[]", node]),
  payload: undefined,
  shape: t.record(
    t.string,
    t.keyof({
      Online: null,
      Offline: null,
      "Unable to authenticate": null,
    }),
  ),
});
