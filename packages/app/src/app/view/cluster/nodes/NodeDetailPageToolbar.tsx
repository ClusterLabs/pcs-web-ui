import {Action} from "app/store";
import {DetailToolbar, LauncherItem as ToolbarItem, task} from "app/view/share";
import {Node} from "app/view/cluster/types";
import {useLoadedCluster} from "app/view/cluster/share";

export const NodeDetailPageToolbar = ({node}: {node: Node}) => {
  const {clusterName} = useLoadedCluster();

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
  };

  const unstandby: ToolbarItem = {
    name: "unstandby",
    confirm: {
      title: "Untandby node?",
      description: (
        <>
          Remove the node from standby mode. The node specified will now be able
          to to host resources
        </>
      ),
      action: standbyUnstandbyAction(false),
    },
  };

  const maintenanceUnmanintenanceAction = (maintenance: boolean): Action => ({
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
      action: maintenanceUnmanintenanceAction(true),
    },
  };

  const unmaintenance: ToolbarItem = {
    name: "unmaintenance",
    confirm: {
      title: "Unmaintenance node?",
      description: "Remove the node into maintenance mode",
      action: maintenanceUnmanintenanceAction(false),
    },
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
  };

  const stop: ToolbarItem = {
    name: "stop",
    task: {
      component: task.forceableConfirm.Task({
        runLabel: "Stop",
        taskLabel: "Stop node",
        description: "Stop a cluster on the node",
        getForceableAction: ({force}) => ({
          type: "NODE.STOP",
          key: {clusterName},
          payload: {nodeName: node.name, force},
        }),
        "data-test": "cluster-stop",
      }),
      useTask: task.forceableConfirm.useTask,
    },
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
  };
  return (
    <DetailToolbar
      toolbarName="node"
      buttonsItems={[start, stop]}
      dropdownItems={[
        ...[node.inStandby ? unstandby : standby],
        ...[node.inMaintenance ? unmaintenance : maintenance],
        remove,
      ]}
    />
  );
};
