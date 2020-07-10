import { LeafAction, SetupDataReading } from "./setupDataReading";

export type Action = LeafAction | SetupDataReading;
export const actionType = (value: Action["type"]): Action["type"] => value;
