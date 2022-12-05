import {useClusterSources} from "app/view/cluster/share";

export type Agent = ReturnType<typeof useClusterSources>["pcmkAgents"][string];

export type AgentParameter = Agent["parameters"][number];
