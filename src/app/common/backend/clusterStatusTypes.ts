/* eslint-disable camelcase */

export interface ApiIssue {
  message: string,
}

export interface ApiWithIssues {
  error_list: ApiIssue[],
  warning_list: ApiIssue[],
}

export type ApiQuorum = boolean|"unknown";

export type ApiNodeStatus = "online"|"offline";

export interface ApiNode extends ApiWithIssues {
  name: string,
  status: ApiNodeStatus,
  quorum: ApiQuorum,
}

export type ApiResourceStatus = "running"|"blocked"|"failed"|string;

export interface ApiResource extends ApiWithIssues {
  id: string,
  stonith: boolean,
  status: ApiResourceStatus,
}

export interface ApiClusterStatus extends ApiWithIssues{
  cluster_name: string,
  status: "ok"|"warning"|"error"|string,
  node_list: ApiNode[],
  resource_list: ApiResource[],
}
