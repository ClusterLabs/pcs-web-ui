import { Root } from "./types";

export const getAuthNodeState = (id: number) => (state: Root) =>
  state.nodeAuthMap[id];
