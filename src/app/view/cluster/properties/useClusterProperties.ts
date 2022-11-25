import {useSelector} from "react-redux";

import {selectors} from "app/store";
import {useSelectedClusterName} from "app/view/share";

const {getClusterProperties} = selectors;
export type ClusterProperties = selectors.ExtractClusterSelector<
  typeof getClusterProperties
>;

export const useClusterProperties = () => {
  const clusterName = useSelectedClusterName();
  const clusterPropertiesDefinition = useSelector(
    getClusterProperties(clusterName),
  );
  return {
    clusterPropertiesDefinition,
  };
};
