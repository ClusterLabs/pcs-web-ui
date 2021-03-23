import { libCallCluster } from "app/backend/calls";
import * as result from "app/backend/result";

import * as log from "./log";
import { PayloadOf } from "./call";

export * from "./call";

export type LibReport = PayloadOf<typeof libCallCluster>["report_list"][number];

export { log, result };
