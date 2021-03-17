import { types } from "app/store/reducers";

import { Selector } from "./selector";

export const getAuthNodeState = (
  id: number,
): Selector<types.nodeAuth.NodeAuth> => state => state.nodeAuthMap[id];
