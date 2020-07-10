import * as types from "app/store/types";
import { Selector } from "app/store/types";

export const getClusterProperties = (
  clusterUrlName: string,
): Selector<types.clusterProperties.ClusterProperties> => state =>
  state.clusterStorage[clusterUrlName]?.clusterProperties.data;
