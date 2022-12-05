import {useSelector} from "react-redux";

import {selectors} from "app/store";

export const useClusterInfo = (clusterName: string) =>
  useSelector(selectors.getClusterStoreInfo(clusterName));
