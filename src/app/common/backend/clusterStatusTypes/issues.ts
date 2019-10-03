/* eslint-disable camelcase */

export interface ApiIssue {
  message: string,
  type?: string;
  node_list?: string[];
}

export interface ApiWithIssues {
  error_list: ApiIssue[],
  warning_list: ApiIssue[],
}
