import {useSelector} from "react-redux";

import {selectors} from "app/store";
import {useLoadedCluster} from "app/view/cluster/share";

const {getClusterProperties} = selectors;
export type ClusterProperties = selectors.ExtractClusterSelector<
  typeof getClusterProperties
>;

export const useClusterProperties = () => ({
  clusterPropertiesDefinition: useSelector(
    getClusterProperties(useLoadedCluster().clusterName),
  ),
});
