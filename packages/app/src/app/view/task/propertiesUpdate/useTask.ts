import React from "react";
import {useSelector} from "react-redux";

import {selectors} from "app/store";
import {useTaskCommon} from "../useTaskCommon";

const {getClusterProperties} = selectors;

export type ClusterProperties = ReturnType<typeof getClusterProperties>;

export const useTask = () => {
  const task = useTaskCommon("propertiesUpdate");

  const {
    state: {clusterName, originalPropertyMap, modifiedPropertyMap},
    dispatch,
  } = task;

  const propertyMap = React.useMemo(
    () =>
      Object.entries(modifiedPropertyMap).reduce(
        (propertyMap, [name, value]) => {
          if ((originalPropertyMap[name] ?? "") !== value) {
            // just real changes
            propertyMap[name] = value;
          }
          return propertyMap;
        },
        {} as Record<string, string>,
      ),
    [originalPropertyMap, modifiedPropertyMap],
  );

  return {
    ...task,
    clusterName,
    clusterPropertiesDefinition: useSelector(getClusterProperties),
    userPropertyMap: {...originalPropertyMap, ...modifiedPropertyMap},
    hasChanges: Object.keys(propertyMap).length > 0,
    propertyMap,

    propertiesUpdate: ({force}: {force: boolean}) => {
      dispatch({
        type: "CLUSTER.PROPERTIES.UPDATE",
        payload: {
          propertyMap,
          force,
        },
      });
    },

    modifyProperty: (name: string, value: string) => {
      dispatch({
        type: "CLUSTER.PROPERTIES.UPDATE.MODIFY_ITEM",
        payload: {name, value},
      });
    },

    recoverFromError: () => {
      console.log("RECOVER");
      dispatch({type: "CLUSTER.PROPERTIES.UPDATE.ERROR.RECOVER"});
    },

    close: () => {
      dispatch({type: "CLUSTER.PROPERTIES.UPDATE.CLOSE"});
      task.close();
    },
  };
};
