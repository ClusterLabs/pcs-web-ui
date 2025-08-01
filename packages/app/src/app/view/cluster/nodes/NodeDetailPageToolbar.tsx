import {testMarks} from "app/view/dataTest";
import type {Action} from "app/store";
import {
  LauncherDropdown,
  type LauncherItem as ToolbarItem,
} from "app/view/share";
import type {Node} from "app/view/cluster/types";
import {DetailToolbar, useLoadedCluster} from "app/view/cluster/share";
import {useOpenTask} from "app/view/task";

const {toolbar} = testMarks.cluster.nodes.currentNode;

export const NodeDetailPageToolbar = ({node}: {node: Node}) => {
  const {clusterName} = useLoadedCluster();
  const openTask = useOpenTask();

  const standbyUnstandbyAction = (standby: boolean): Action => ({
    type: "LIB.CALL.CLUSTER",
    key: {clusterName},
    payload: {
      taskLabel: `standby node "${node.name}"`,
      call: {
        name: "node-standby-unstandby",
        payload: {standby, node_names: [node.name]},
      },
    },
  });
  const standby: ToolbarItem = {
    name: "standby",
    confirm: {
      title: "Standby node?",
      description: (
        <>
          Put the node into standby mode. The node will no longer be able to
          host resources
        </>
      ),
      action: standbyUnstandbyAction(true),
    },
    ...toolbar.dropdown.standby.mark,
  };

  const unstandby: ToolbarItem = {
    name: "unstandby",
    confirm: {
      title: "Unstandby node?",
      description: (
        <>
          Remove the node from standby mode. The node specified will now be able
          to host resources
        </>
      ),
      action: standbyUnstandbyAction(false),
    },
    ...toolbar.dropdown.unstandby.mark,
  };

  const maintenanceUnmaintenanceAction = (maintenance: boolean): Action => ({
    type: "LIB.CALL.CLUSTER",
    key: {clusterName},
    payload: {
      taskLabel: `maintenance node "${node.name}"`,
      call: {
        name: "node-maintenance-unmaintenance",
        payload: {
          maintenance,
          node_names: [node.name],
        },
      },
    },
  });

  const maintenance: ToolbarItem = {
    name: "maintenance",
    confirm: {
      title: "Maintenance node?",
      description: "Put the node into maintenance mode",
      action: maintenanceUnmaintenanceAction(true),
    },
    ...toolbar.dropdown.maintenance.mark,
  };

  const unmaintenance: ToolbarItem = {
    name: "unmaintenance",
    confirm: {
      title: "Unmaintenance node?",
      description: "Remove the node from maintenance mode",
      action: maintenanceUnmaintenanceAction(false),
    },
    ...toolbar.dropdown.unmaintenance.mark,
  };

  const start: ToolbarItem = {
    name: "start",
    confirm: {
      title: "Start node?",
      description: "Start a cluster on the node",
      action: {
        type: "NODE.START",
        key: {clusterName},
        payload: {nodeName: node.name},
      },
    },
    ...toolbar.start.mark,
  };

  const stop: ToolbarItem = {
    name: "stop",
    run: () =>
      openTask("nodeStop", {
        type: "NODE.STOP.INIT",
        key: {clusterName},
        payload: {clusterName, nodeName: node.name},
      }),
    ...toolbar.stop.mark,
  };

  const remove: ToolbarItem = {
    name: "remove",
    confirm: {
      title: "Remove node?",
      description: "Shutdown specified nodes and remove them from the cluster.",
      action: {
        type: "LIB.CALL.CLUSTER",
        key: {clusterName},
        payload: {
          taskLabel: `remove node "${node.name}"`,
          call: {
            name: "cluster-remove-nodes",
            payload: {node_list: [node.name]},
          },
        },
      },
    },
    ...toolbar.dropdown.remove.mark,
  };
  return (
    <DetailToolbar
      buttonsItems={[start, stop]}
      dropdown={
        <LauncherDropdown
          items={[
            ...[node.inStandby ? unstandby : standby],
            ...[node.inMaintenance ? unmaintenance : maintenance],
            remove,
          ]}
          {...toolbar.dropdown.mark}
        />
      }
      {...toolbar.mark}
    />
  );
};
