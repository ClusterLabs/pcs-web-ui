// Temporary sentinel key for the single-cluster storage.
//
// The cluster storage reducer is still shaped as a map keyed by cluster name
// (`Record<clusterName, item>`), but the application now manages a single
// cluster whose name is unknown at startup. Until the follow-up de-keying
// ticket flattens the storage and drops `clusterName` from the actions, every
// storage write (reducer) and read (selectors) collapses onto this single
// constant key. The sentinel is intentionally the empty string so it is
// obviously not a real cluster name.
export const CLUSTER_KEY = "";
