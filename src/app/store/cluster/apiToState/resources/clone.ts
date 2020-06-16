import { ApiClone, ApiPrimitive } from "app/backend/types/clusterStatus";

import { Clone, Group, Primitive, ResourceStatusInfo } from "../../types";
import { transformIssues } from "../issues";
import { toPrimitive } from "./primitive";
import { toGroup } from "./group";
import { buildStatus, statusToSeverity } from "./statusInfoList";

const buildStatusInfoList = (apiClone: ApiClone): ResourceStatusInfo[] => {
  const infoList: ResourceStatusInfo[] = [
    {
      label: apiClone.status,
      severity: statusToSeverity(apiClone.status),
    },
  ];

  return infoList;
};

export const toClone = (
  apiClone: ApiClone,
): { clone: Clone; apiPrimitiveList: ApiPrimitive[] } => {
  let member: Primitive | Group;
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
