import { types } from "app/store";
import { Selector } from "app/store/types";

export const getClusterProperties = (
  clusterUrlName: string,
): Selector<types.clusterProperties.ClusterProperties> => state =>
  state.clusterStorage[clusterUrlName]?.clusterProperties.data;
