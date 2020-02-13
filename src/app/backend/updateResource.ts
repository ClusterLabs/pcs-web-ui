import * as t from "io-ts";

import { postForJson } from "./calls";
import {
  ApiCall,
  createResult,
  validateShape,
} from "./tools";

const ApiUpdateResource = t.partial({
  error: t.literal("true"),
  stdout: t.string,
  stderr: t.string,
});
type Result = t.TypeOf<typeof ApiUpdateResource>;


export const updateResource: ApiCall<Result> = async (
  clusterUrlName: string,
  resourceId: string,
  attributes: Record<string, string>,
) => {
  const instanceAttributes: [string, string][] = Object.keys(attributes).map(
    key => [`_res_paramne_${key}`, attributes[key]],
  );
  const raw = await postForJson(
    `/managec/${clusterUrlName}/update_resource`,
    [
      ["resource_id", resourceId],
      ...instanceAttributes,
    ],
  );
  return createResult<Result>(raw, validateShape(raw, ApiUpdateResource));
};
