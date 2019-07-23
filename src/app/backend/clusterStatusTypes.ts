/* eslint-disable camelcase */

export interface ApiIssue {
  message: string,
}

export interface ApiWithIssues {
  error_list: ApiIssue[],
  warning_list: ApiIssue[],
}

export type ApiQuorum = boolean|"unknown";

export type ApiNodeStatus = "online"|"offline"|string;

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

export type ApiClusterStatusFlag = "ok"|"warning"|"error"|string;

export interface ApiClusterStatus extends ApiWithIssues{
  cluster_name: string,
  status: ApiClusterStatusFlag,
  node_list: ApiNode[],
  resource_list: ApiResource[],
}
