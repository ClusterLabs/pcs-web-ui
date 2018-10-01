import * as types from "./constants";

export const setUpDataReading = (readingDefinitions) => ({
  type: types.SET_UP_DATA_READING,
  payload: readingDefinitions,
});
