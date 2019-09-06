import { AnyAction } from "redux";

import { ReadingDefinition } from "./types";

export interface SetupDataReading extends AnyAction {
  type: "DATA_READING.SET_UP",
  payload: Record<string, ReadingDefinition>,
}
