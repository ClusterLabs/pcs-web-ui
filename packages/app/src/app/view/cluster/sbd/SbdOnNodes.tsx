import {Td, Thead, Tr} from "@patternfly/react-table";

import {testMarks} from "app/view/dataTest";
import {EmptyStateNoItem, Table} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

import {SbdOnNodesWatchdog} from "./SbdOnNodesWatchdog";
import {SbdOnNodesDevices} from "./SbdOnNodesDevices";

const {perNode} = testMarks.cluster.sbd;

export const SbdOnNodes = () => {
  const {nodeList} = useLoadedCluster();

  if (nodeList.length === 0) {
    return <EmptyStateNoItem title="No SBD watchdogs." />;
  }

  return (
    <Table>
      <Thead>
        <Tr>
          <th data-label="Node">Node</th>
          <th data-label="Watchdog">Watchdog</th>
          <th data-label="Devices">Devices</th>
        </Tr>
      </Thead>

      <Table.Body>
        {Object.values(nodeList).map(node => (
          <Tr key={node.name} {...perNode.mark}>
            <Td data-label="Node" {...perNode.node.mark}>
              {node.name}
            </Td>
            <Td data-label="Watchdog">
              <SbdOnNodesWatchdog node={node} />
            </Td>
            <Td data-label="Devices">
              <SbdOnNodesDevices node={node} />
            </Td>
          </Tr>
        ))}
      </Table.Body>
    </Table>
  );
};
