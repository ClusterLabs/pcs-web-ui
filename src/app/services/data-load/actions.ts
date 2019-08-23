import { AnyAction } from "redux";

import { SET_UP_DATA_READING, ReadingDefinition } from "./types";

export interface SetupDataReading extends AnyAction {
  type: typeof SET_UP_DATA_READING,
  payload: Record<string, ReadingDefinition>,
}
