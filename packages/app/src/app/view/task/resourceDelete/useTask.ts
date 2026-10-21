import {useTaskCommon} from "../useTaskCommon";

export const useTask = () => {
  const task = useTaskCommon("resourceDelete");

  const {
    state: {resourceId, resourceType},
    dispatch,
  } = task;

  return {
    ...task,

    resourceDelete: ({force}: {force: boolean}) => {
      dispatch({
        type: "RESOURCE.DELETE",
        payload: {resourceId, resourceType, force},
      });
    },

    close: () => {
      dispatch({type: "RESOURCE.DELETE.CLOSE"});
      task.close();
    },
  };
};
