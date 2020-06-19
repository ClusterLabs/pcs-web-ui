import { ApiClone, ApiPrimitive } from "app/backend/types/clusterStatus";

import { types } from "app/store";
import { transformIssues } from "../issues";
import { toPrimitive } from "./primitive";
import { toGroup } from "./group";
import { buildStatus, statusToSeverity } from "./statusInfoList";

const buildStatusInfoList = (
  apiClone: ApiClone,
): types.cluster.ResourceStatusInfo[] => {
  const infoList: types.cluster.ResourceStatusInfo[] = [
    {
      label: apiClone.status,
      severity: statusToSeverity(apiClone.status),
    },
  ];

  return infoList;
};

export const toClone = (
  apiClone: ApiClone,
): { clone: types.cluster.Clone; apiPrimitiveList: ApiPrimitive[] } => {
  let member: types.cluster.Clone["member"];
  let apiPrimitiveList: ApiPrimitive[] = [];
  if (apiClone.member.class_type === "primitive") {
    member = toPrimitive(apiClone.member);
    apiPrimitiveList = [apiClone.member];
  } else {
    ({ apiPrimitiveList, group: member } = toGroup(apiClone.member));
  }

  return {
    apiPrimitiveList,
    clone: {
      id: apiClone.id,
      itemType: "clone",
      member,
      status: buildStatus(buildStatusInfoList(apiClone)),
      issueList: transformIssues(apiClone),
    },
  };
};
