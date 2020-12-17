import { types } from "app/store/state";

import { Selector } from "./selector";

export const getAuthNodeState = (
  id: number,
): Selector<types.nodeAuth.NodeAuth> => state => state.nodeAuthMap[id];
