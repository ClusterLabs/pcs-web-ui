import {ActionPayload} from "app/store";
import {useClusterTask} from "app/view/cluster/share";

type SbdTimeoutAction = Extract<
  ActionPayload["LIB.CALL.CLUSTER.TASK"]["call"],
  {name: "sbd-enable-sbd"}
>["payload"]["sbd_options"]["SBD_TIMEOUT_ACTION"];

export const useTask = () => {
  const task = useClusterTask("sbdConfigure");
  const {dispatch, state, clusterName} = task;

  const getSbdTimeout = (): SbdTimeoutAction => {
    if (
      state.timeoutAction !== "DEFAULT"
      && state.timeoutActionFlush !== "DEFAULT"
    ) {
      return `${state.timeoutActionFlush},${state.timeoutAction}`;
    }
    if (state.timeoutAction !== "DEFAULT") {
      return state.timeoutAction;
    }
    if (state.timeoutActionFlush !== "DEFAULT") {
      return state.timeoutActionFlush;
    }
    return undefined;
  };

  return {
    ...task,
    getSbdTimeout,
    isWatchdogTimeoutValid: /^(\d*)$/.test(state.watchdogTimeout),

    //actions
    close: () => {
      task.close();
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.CANCEL",
        key: {clusterName, task: task.name},
      });
      dispatch({
        type: "CLUSTER.SBD.CONFIGURE.CLOSE",
        key: {clusterName},
      });
    },

    updateState: (payload: ActionPayload["CLUSTER.SBD.CONFIGURE.UPDATE"]) =>
      dispatch({
        type: "CLUSTER.SBD.CONFIGURE.UPDATE",
        key: {clusterName},
        payload,
      }),

    sbdConfigure: ({force}: {force: boolean}) => {
      const sbdTimeoutAction = getSbdTimeout();
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: {clusterName, task: task.name},
        payload: {
          taskLabel: "configure sbd",
          call: {
            name: "sbd-enable-sbd",
            payload: {
              default_watchdog: null,
              watchdog_dict: Object.entries(state.watchdogDict).reduce(
                (watchdogDict, [nodeName, watchdog]) => ({
                  ...watchdogDict,
                  ...(watchdog.length === 0 ? {} : {[nodeName]: watchdog}),
                }),
                {},
              ),
              sbd_options: {
                SBD_DELAY_START:
                  state.delayStart === "DEFAULT" ? undefined : state.delayStart,
                SBD_STARTMODE:
                  state.startmode === "DEFAULT" ? undefined : state.startmode,
                SBD_WATCHDOG_TIMEOUT: state.watchdogTimeout,
                ...(sbdTimeoutAction === undefined
                  ? {}
                  : {SBD_TIMEOUT_ACTION: sbdTimeoutAction}),
              },
              ignore_offline_nodes: force,
            },
          },
        },
      });
    },
  };
};
