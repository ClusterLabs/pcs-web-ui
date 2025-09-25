import React from "react";
import {useSelector} from "react-redux";

import {selectors} from "app/store";
import {useTaskCommon} from "../useTaskCommon";

const {getClusterProperties} = selectors;

export type ClusterProperties = selectors.ExtractClusterSelector<
  typeof getClusterProperties
>;

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
    clusterPropertiesDefinition: useSelector(getClusterProperties(clusterName)),
    userPropertyMap: {...originalPropertyMap, ...modifiedPropertyMap},
    hasChanges: Object.keys(propertyMap).length > 0,
    propertyMap,

    propertiesUpdate: () => {
      dispatch({
        type: "CLUSTER.PROPERTIES.UPDATE",
        key: {clusterName},
        payload: {
          propertyMap,
        },
      });
    },

    modifyProperty: (name: string, value: string) => {
      dispatch({
        type: "CLUSTER.PROPERTIES.UPDATE.MODIFY_ITEM",
        key: {clusterName},
        payload: {name, value},
      });
    },

    recoverFromError: () => {
      console.log("RECOVER");
      dispatch({
        type: "CLUSTER.PROPERTIES.UPDATE.ERROR.RECOVER",
        key: {clusterName},
      });
    },

    close: () => {
      dispatch({
        type: "CLUSTER.PROPERTIES.UPDATE.CLOSE",
        key: {clusterName},
      });
      task.close();
    },
  };
};
