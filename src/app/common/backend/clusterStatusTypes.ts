/* eslint-disable camelcase */

export interface ApiIssue {
  message: string,
}

export interface ApiWithIssues {
  error_list: ApiIssue[],
  warning_list: ApiIssue[],
}

export interface ApiNode extends ApiWithIssues {
  name: string,
  status: "unknown"|"online"|"offline",
  quorum: boolean|"unknown",
}

export interface ApiResourceLike extends ApiWithIssues {
  id: string,
  class_type: string,
  status: "running"|"blocked"|"failed"|string,
}

export interface ApiResource extends ApiResourceLike {
  class_type: "primitive",
  stonith: false,
}

export interface ApiStonith extends ApiResourceLike {
  class_type: "stonith",
  stonith: true,
}

export type ApiResourcePcmkPrimitive = ApiResource|ApiStonith;

export interface ApiGroup extends ApiResourceLike {
  class_type: "group",
  members: ApiResourcePcmkPrimitive[],
}

export interface ApiClone extends ApiResourceLike {
  class_type: "clone",
  member: ApiResourcePcmkPrimitive|ApiGroup,
}

export interface ApiClusterStatus extends ApiWithIssues{
  cluster_name: string,
  status: "unknown"|"ok"|"warning"|"error"|string,
  node_list: ApiNode[],
  resource_list: (ApiResourcePcmkPrimitive|ApiGroup|ApiClone)[],
}
