import React from "react";
import { StackItem, Text, TextContent } from "@patternfly/react-core";

import { selectors } from "app/store";
import { Primitive } from "app/view/cluster/types";
import {
  CrmStatusTable,
  IssueList,
  Link,
  LoadedPcmkAgent,
  PcmkAgentDescription,
  location,
  useClusterSelector,
} from "app/view/share";

export const PrimitiveDetail = ({ primitive }: { primitive: Primitive }) => {
  const [
    crmStatusList,
    clusterName,
  ] = useClusterSelector(selectors.crmStatusForPrimitive, [primitive.id]);
  return (
    <>
      <StackItem>
        <TextContent>
          <Text component="h1"> Description </Text>
        </TextContent>

        <LoadedPcmkAgent
          clusterName={clusterName}
          agentName={primitive.agentName}
        >
          {agent => (
            <PcmkAgentDescription
              name={agent.name}
              shortdesc={agent.shortdesc}
              longdesc={agent.longdesc}
            />
          )}
        </LoadedPcmkAgent>
      </StackItem>
      <StackItem>
        {primitive.issueList.length > 0 && (
          <TextContent>
            <Text component="h1"> Issues </Text>
          </TextContent>
        )}
        <IssueList issueList={primitive.issueList} hideEmpty />
      </StackItem>
      <StackItem>
        <TextContent>
          <Text component="h1"> Status </Text>
        </TextContent>

        <CrmStatusTable
          crmStatusList={crmStatusList}
          emptyMessage={`No status info form resource "${primitive.id}" found.`}
          rowObject={{
            header: "Node",
            /* eslint-disable-next-line react/display-name */
            cell: crmStatus =>
              !crmStatus.node ? null : (
                <Link
                  to={location.node({
                    clusterName,
                    nodeName: crmStatus.node.name,
                  })}
                />
              ),
          }}
        />
      </StackItem>
    </>
  );
};
