import { ReadingDefinition } from "./types";

export type DataLoadActions = {
  SetupDataReading: {
    type: "DATA_READING.SET_UP",
    payload: Record<string, ReadingDefinition>,
  };
}
