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
      <thead>
        <tr>
          <th data-label="Node">Node</th>
          <th data-label="Watchdog">Watchdog</th>
          <th data-label="Devices">Devices</th>
        </tr>
      </thead>

      <Table.Body>
        {Object.values(nodeList).map(node => (
          <tr key={node.name} {...perNode.mark}>
            <td data-label="Node" {...perNode.node.mark}>
              {node.name}
            </td>
            <td data-label="Watchdog">
              <SbdOnNodesWatchdog node={node} />
            </td>
            <td data-label="Devices">
              <SbdOnNodesDevices node={node} />
            </td>
          </tr>
        ))}
      </Table.Body>
    </Table>
  );
};
