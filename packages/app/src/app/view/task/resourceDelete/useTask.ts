import {useTaskCommon} from "../useTaskCommon";

export const useTask = () => {
  const task = useTaskCommon("resourceDelete");

  const {
    state: {clusterName, resourceId, resourceType},
    dispatch,
  } = task;

  return {
    ...task,
    clusterName,

    resourceDelete: ({force}: {force: boolean}) => {
      dispatch({
        type: "RESOURCE.DELETE",
        key: {clusterName},
        payload: {resourceId, resourceType, force},
      });
    },

    close: () => {
      dispatch({
        type: "RESOURCE.DELETE.CLOSE",
        key: {clusterName},
      });
      task.close();
    },
  };
};
