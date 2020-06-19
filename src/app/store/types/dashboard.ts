export type ClusterNameListState = string[];

export interface DashboardPageState {
  clusterNameListState: ClusterNameListState;
  dataFetchState: "NOT_STARTED" | "IN_PROGRESS" | "SUCCESS" | "ERROR";
}
