import { ActionPayload } from "app/store/actions";

import { Cluster } from "../../types";
import { transformIssues } from "../issues";

import { toPrimitive } from "./primitive";
import { toGroup } from "./group";
import { buildStatus, statusToSeverity } from "./statusInfoList";

type ApiCluster = ActionPayload["CLUSTER.STATUS.FETCH.OK"];
type ApiResource = ApiCluster["resource_list"][number];
type ApiClone = Extract<ApiResource, { class_type: "clone" }>;
type ApiPrimitive = Extract<
  ApiResource,
  { class_type: "primitive"; stonith: false }
>;

type Clone = Extract<Cluster["resourceTree"][number], { itemType: "clone" }>;

const buildStatusInfoList = (
  apiClone: ApiClone,
): Clone["status"]["infoList"] => {
  const infoList: Clone["status"]["infoList"] = [
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
  clone: Clone;
  apiPrimitiveList: ApiPrimitive[];
} => {
  let member: Clone["member"];
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
