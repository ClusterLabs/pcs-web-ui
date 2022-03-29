import { ActionPayload } from "app/store";
import { useClusterTask } from "app/view/share";

export const useTask = () => {
  const task = useClusterTask("sbdEnable");
  const { dispatch, state, clusterName } = task;

  return {
    ...task,

    //actions
    close: () => {
      task.close();
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.CANCEL",
        key: { clusterName, task: task.name },
      });
      dispatch({
        type: "CLUSTER.SBD.ENABLE.CLOSE",
        key: { clusterName },
      });
    },

    updateState: (payload: ActionPayload["CLUSTER.SBD.ENABLE.UPDATE"]) =>
      dispatch({
        type: "CLUSTER.SBD.ENABLE.UPDATE",
        key: { clusterName },
        payload,
      }),

    sbdEnable: ({ force }: { force: boolean }) => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: { clusterName, task: task.name },
        payload: {
          taskLabel: "enable sbd",
          call: {
            name: "sbd-enable-sbd",
            payload: {
              default_watchdog: state.defaultWatchdog,
              watchdog_dict: state.watchdogDict,
              sbd_options: {
                SBD_DELAY_START:
                  state.delayStart === "DEFAULT" ? "no" : state.delayStart,
                SBD_STARTMODE:
                  state.startmode === "DEFAULT" ? "always" : state.startmode,
                SBD_WATCHDOG_TIMEOUT: state.watchdogTimeout,
              },
              ignore_offline_nodes: force,
            },
          },
        },
      });
    },
  };
};
