import {useClusterSources} from "app/view/share";

export type Agent = ReturnType<typeof useClusterSources>["pcmkAgents"][string];

export type AgentParameter = Agent["parameters"][number];
