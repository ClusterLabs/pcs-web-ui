import * as t from "io-ts";

import { getJson } from "./calls";
import {
  ApiCall,
  createResult,
  dealWithInvalidJson,
  validateShape,
} from "./tools";

const ApiImportedClusterList = t.type({
  cluster_list: t.array(
    t.type({
      name: t.string,
    }),
  ),
});

type Result = t.TypeOf<typeof ApiImportedClusterList>;

export const importedClusterList: ApiCall<Result> = async () => {
  try {
    const raw = await getJson("/imported-cluster-list");
    return createResult<Result>(
      raw,
      validateShape(raw, ApiImportedClusterList),
    );
  } catch (e) {
    return dealWithInvalidJson(e);
  }
};
