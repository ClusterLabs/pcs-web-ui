// Temporary placeholder value for the clusterName carried by cluster actions.
//
// The cluster storage reducer and selectors now use a single-cluster shape
// (`clusterData: ClusterData | null`) and no longer key anything by cluster
// name. However, the actions still carry a mandatory `key.clusterName`, which
// the sagas and the view fill with this constant. Until the follow-up de-keying
// ticket drops `clusterName` from the actions, sagas, and view, this sentinel
// remains the placeholder value fed into `key.clusterName`. The value is
// intentionally the empty string so it is obviously not a real cluster name.
export const CLUSTER_KEY = "";
