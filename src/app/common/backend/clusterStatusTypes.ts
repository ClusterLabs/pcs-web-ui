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

export interface ApiResourceBase extends ApiWithIssues {
  id: string,
  class_type: string,
  status: "running"|"blocked"|"failed"|string,
}

export interface ApiPrimitive extends ApiResourceBase {
  class_type: "primitive",
  stonith: false,
}

export interface ApiStonith extends ApiResourceBase {
  class_type: "stonith",
  stonith: true,
}

export interface ApiGroup extends ApiResourceBase {
  class_type: "group",
  members: ApiResource[],
}

export interface ApiClone extends ApiResourceBase {
  class_type: "clone",
  member: ApiPrimitive|ApiGroup,
}

export type ApiResource = ApiPrimitive|ApiGroup|ApiClone|ApiStonith;

export interface ApiClusterStatus extends ApiWithIssues{
  cluster_name: string,
  status: "unknown"|"ok"|"warning"|"error"|string,
  node_list: ApiNode[],
  resource_list: ApiResource[],
}
