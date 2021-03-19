import * as types from "app/store/types";

import { Selector } from "./selector";

export const getAuthNodeState = (
  id: number,
): Selector<types.nodeAuth.NodeAuth> => state => state.nodeAuthMap[id];
