import { CallResult, endpoints, http } from "./tools";
const { url } = endpoints.removeConstraintRemote;

export const removeConstraintRemote = async ({
  clusterName,
  constraintId,
}: {
  clusterName: string;
  constraintId: string;
}): CallResult =>
  http.post(url({ clusterName }), {
    params: [["constraint_id", constraintId]],
  });
