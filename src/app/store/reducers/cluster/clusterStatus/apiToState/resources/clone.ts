import {ActionPayload} from "app/store/actions";

import {Cluster} from "../../types";
import {transformIssues} from "../issues";

import {toPrimitive} from "./primitive";
import {toFenceDevice} from "./fenceDevice";
import {toGroup} from "./group";
import {buildStatus, statusToSeverity} from "./statusInfoList";

type ApiCluster = ActionPayload["CLUSTER.STATUS.FETCH.OK"];
type ApiResource = ApiCluster["resource_list"][number];
type ApiClone = Extract<ApiResource, {class_type: "clone"}>;
type ApiPrimitive = Extract<
  ApiResource,
  {class_type: "primitive"; stonith: false}
>;

type Clone = Extract<Cluster["resourceTree"][number], {itemType: "clone"}>;

const buildStatusInfoList = (
  apiClone: ApiClone,
): Clone["status"]["infoList"] => {
  if (
    (apiClone.member.class_type === "primitive" && apiClone.member.stonith)
    || (apiClone.member.class_type === "group"
      && apiClone.member.members.some(m => m.stonith))
  ) {
    return [
      {
        label: "WITH FENCE DEVICE",
        severity: "ERROR",
      },
    ];
  }
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
    if (apiClone.member.stonith) {
      member = toFenceDevice(apiClone.member);
    } else {
      member = toPrimitive(apiClone.member, {inClone: true, inGroup: null});
      apiPrimitiveList = [apiClone.member];
    }
  } else {
    ({apiPrimitiveList, group: member} = toGroup(apiClone.member, {
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
