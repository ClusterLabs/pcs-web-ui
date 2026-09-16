import {type CallResult, endpoints, http} from "./tools";

const {url} = endpoints.removeConstraintRemote;

export const removeConstraintRemote = async ({
  constraintId,
}: {
  constraintId: string;
}): CallResult => http.post(url, {params: [["constraint_id", constraintId]]});
