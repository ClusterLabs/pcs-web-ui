import { ActionPayload, selectors } from "app/store";
import { useClusterSelector, useClusterTask } from "app/view/share";

export const useTask = () => {
  const task = useClusterTask("sbdConfigure");
  const { dispatch, state, clusterName } = task;

  const [cluster] = useClusterSelector(selectors.getCluster);

  const timeoutAction =
    state.timeoutActionFlush === "DEFAULT"
      ? state.timeoutAction === "DEFAULT"
        ? undefined
        : state.timeoutAction
      : state.timeoutAction === "DEFAULT"
      ? state.timeoutActionFlush
      : state.timeoutActionFlush + "," + state.timeoutAction;

  return {
    ...task,
    timeoutAction,

    //actions
    open: () => {
      dispatch({
        type: "CLUSTER.SBD.CONFIGURE",
        key: { clusterName },
        payload: { cluster },
      });
      task.open();
    },

    close: () => {
      task.close();
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.CANCEL",
        key: { clusterName, task: task.name },
      });
      dispatch({
        type: "CLUSTER.SBD.CONFIGURE.CLOSE",
        key: { clusterName },
      });
    },

    updateState: (payload: ActionPayload["CLUSTER.SBD.CONFIGURE.UPDATE"]) =>
      dispatch({
        type: "CLUSTER.SBD.CONFIGURE.UPDATE",
        key: { clusterName },
        payload,
      }),

    sbdConfigure: ({ force }: { force: boolean }) => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: { clusterName, task: task.name },
        payload: {
          taskLabel: "configure sbd",
          call: {
            name: "sbd-enable-sbd",
            payload: {
              default_watchdog: null,
              watchdog_dict: state.watchdogDict,
              sbd_options: {
                SBD_DELAY_START:
                  state.delayStart === "DEFAULT" ? undefined : state.delayStart,
                SBD_STARTMODE:
                  state.startmode === "DEFAULT" ? undefined : state.startmode,
                SBD_WATCHDOG_TIMEOUT: state.watchdogTimeout,
                SBD_TIMEOUT_ACTION:
                  timeoutAction as typeof state.timeoutActionResult,
              },
              ignore_offline_nodes: force,
            },
          },
        },
      });
    },
  };
};
