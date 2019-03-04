export const NODE = {
  QUORUM: {
    YES: "cluster/node/quorum/yes",
    NO: "cluster/node/quorum/no",
    UNKNOWN: "cluster/node/quorum/unknown",
  },
  STATUS: {
    ONLINE: "cluster/node/status/online",
    OFFLINE: "cluster/node/status/offline",
    UNKNOWN: "cluster/node/status/unknown",
  },
};

export const RESOURCE = {
  STATUS: {
    RUNNING: "cluster/resource/status/running",
    BLOCKED: "cluster/resource/status/blocked",
    FAILED: "cluster/resource/status/failed",
    UNKNOWN: "cluster/resource/status/unknown",
  },
};

export const STATUS = {
  OK: "cluster/status/ok",
  WARNING: "cluster/status/warning",
  ERROR: "cluster/status/error",
  UNKNOWN: "cluster/status/unknown",
};

export const ISSUE = {
  ERROR: "cluster/issue/error",
  WARNING: "cluster/issue/warning",
};
