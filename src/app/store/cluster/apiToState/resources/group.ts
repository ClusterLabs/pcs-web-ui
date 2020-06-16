import {
  ApiGroup,
  ApiPrimitive,
  ApiStonith,
} from "app/backend/types/clusterStatus";

import { Group, Primitive, ResourceStatusInfo } from "../../types";
import { transformIssues } from "../issues";
import { toPrimitive } from "./primitive";
import { buildStatus, getMaxSeverity, isDisabled } from "./statusInfoList";

const buildStatusInfoList = (
  apiGroup: ApiGroup,
  members: Primitive[],
): ResourceStatusInfo[] => {
  const infoList: ResourceStatusInfo[] = [];
  if (isDisabled(apiGroup)) {
    infoList.push({ label: "DISABLED", severity: "WARNING" });
  }

  if (members.length === 0) {
    infoList.push({ label: "NO MEMBERS", severity: "WARNING" });
    return infoList;
  }

  const maxSeverity = getMaxSeverity(members, p => p.status.maxSeverity);

  // TODO members should not be OK when group is disabled
  if (maxSeverity === "OK") {
    infoList.push({ label: "RUNNING", severity: "OK" });
    return infoList;
  }

  const labelCounts: Record<string, number> = members.reduce<
    Record<string, number>
  >((counts, primitive) => {
    const nextCounts = { ...counts };
    primitive.status.infoList
      .filter(info => info.severity === maxSeverity)
      .map(info => info.label)
      .forEach((label) => {
        nextCounts[label] = label in counts ? counts[label] + 1 : 1;
      });
    return nextCounts;
  }, {});

  if (Object.keys(labelCounts).length === 0) {
    infoList.push({ label: "UNKNOWN STATUS OF MEMBERS", severity: "WARNING" });
    return infoList;
  }

  Object.keys(labelCounts).forEach(label =>
    infoList.push({
      label: `${labelCounts[label]}/${members.length} ${label}`,
      severity: maxSeverity,
    }),
  );
  return infoList;
};

export const filterPrimitive = (
  candidateList: (ApiPrimitive | ApiStonith)[],
): ApiPrimitive[] =>
  candidateList.filter((m): m is ApiPrimitive => m.class_type === "primitive");

export const toGroup = (
  apiGroup: ApiGroup,
): { group: Group; apiPrimitiveList: ApiPrimitive[] } => {
  // Theoreticaly, group can contain primitive resources, stonith resources or
  // mix of both. A decision here is to filter out stonith...
  const apiPrimitiveList = filterPrimitive(apiGroup.members);
  const resources = apiPrimitiveList.map(p => toPrimitive(p));
  return {
    apiPrimitiveList,
    group: {
      id: apiGroup.id,
      itemType: "group",
      resources,
      status: buildStatus(buildStatusInfoList(apiGroup, resources)),
      issueList: transformIssues(apiGroup),
    },
  };
};
