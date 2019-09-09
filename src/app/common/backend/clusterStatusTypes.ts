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

export interface ApiResource extends ApiWithIssues {
  id: string,
  stonith: boolean,
  status: "running"|"blocked"|"failed"|string,
}

export interface ApiClusterStatus extends ApiWithIssues{
  cluster_name: string,
  status: "unknown"|"ok"|"warning"|"error"|string,
  node_list: ApiNode[],
  resource_list: ApiResource[],
}
