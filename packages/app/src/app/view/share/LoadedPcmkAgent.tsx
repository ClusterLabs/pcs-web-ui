import {useSelector} from "react-redux";

import {EmptyStateError, EmptyStateSpinner} from "app/view/share/emptyState";
// import {useClusterSources} from "app/view/cluster/share";
import {selectors} from "app/store";

type Agent = NonNullable<
  ReturnType<ReturnType<typeof selectors.getAgentInfo>>
>["agent"];

export const LoadedPcmkAgent = ({
  agentName,
  clusterName,
  children,
}: {
  agentName: string;
  clusterName: string;
  children: (_ra: Agent) => JSX.Element;
}) => {
  const agentInfo = useSelector(selectors.getAgentInfo(clusterName, agentName));
  // const {pcmkAgents} = useClusterSources();
  // const agent = pcmkAgents[agentName];

  if (agentInfo !== null && agentInfo.isAgentLoaded) {
    return children(agentInfo.agent);
  }

  if (agentInfo !== null && agentInfo.isAgentLoadFailed) {
    return (
      <EmptyStateError
        title="Cannot load data"
        message={`Cannot load metadata of agent "${agentName}"`}
      />
    );
  }

  return <EmptyStateSpinner title={`Loading agent "${agentName}" data`} />;
};
