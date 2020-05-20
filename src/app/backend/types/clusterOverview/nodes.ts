import * as t from "io-ts";

import {
  TApiNodeName as ApiNodeName,
  TApiNodeQuorum as ApiNodeQuorum,
  TApiNodeService as ApiNodeService,
  TApiWithIssues as ApiWithIssues,
} from "../clusterStatus";

// It is slightly different from cluster status - quorum with status: unknown
export const ApiNode = t.intersection([
  ApiWithIssues,
  t.type({ name: ApiNodeName }),
  t.union([
    t.type({
      status: t.keyof({ unknown: null }),
      quorum: t.literal(false),
    }),
    t.type({
      status: t.keyof({ standby: null, online: null, offline: null }),
      quorum: ApiNodeQuorum,
      uptime: t.string,
      services: t.type({
        pacemaker: ApiNodeService,
        pacemaker_remote: ApiNodeService,
        corosync: ApiNodeService,
        pcsd: ApiNodeService,
        sbd: ApiNodeService,
      }),
      corosync: t.boolean,
      corosync_enabled: t.boolean,
      pacemaker: t.boolean,
      pacemaker_enabled: t.boolean,
      pcsd_enabled: t.boolean,
      sbd_config: t.type({}),
    }),
  ]),
]);
