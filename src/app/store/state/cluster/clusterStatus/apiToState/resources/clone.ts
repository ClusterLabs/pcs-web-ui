import { api } from "app/backend";
import * as types from "app/store/state/types";

import { transformIssues } from "../issues";

import { toPrimitive } from "./primitive";
import { toGroup } from "./group";
import { buildStatus, statusToSeverity } from "./statusInfoList";

type ApiClone = api.types.clusterStatus.ApiClone;
type ApiPrimitive = api.types.clusterStatus.ApiPrimitive;

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
): {
  clone: types.cluster.Clone;
  apiPrimitiveList: ApiPrimitive[];
} => {
  let member: types.cluster.Clone["member"];
  let apiPrimitiveList: ApiPrimitive[] = [];
  if (apiClone.member.class_type === "primitive") {
    member = toPrimitive(apiClone.member, { inClone: true, inGroup: false });
    apiPrimitiveList = [apiClone.member];
  } else {
    ({ apiPrimitiveList, group: member } = toGroup(apiClone.member, {
      inClone: true,
    }));
  }

  return {
    apiPrimitiveList,
    clone: {
      id: apiClone.id,
      itemType: "clone",
      member,
      status: buildStatus(buildStatusInfoList(apiClone)),
      issueList: transformIssues(apiClone),
      metaAttributes: apiClone.meta_attr,
    },
  };
};
