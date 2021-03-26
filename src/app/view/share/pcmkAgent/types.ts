import { selectors } from "app/store";

export type Agent = selectors.ExtractClusterSelector<
  typeof selectors.getPcmkAgent
>;

// AgentParameter must match both - fence device and resource
// attribute deprecated is only in fence device agent so the type would not be
// useable for resource
export type AgentParameter = Exclude<
  Agent["parameters"][number],
  { deprecated: unknown }
>;
