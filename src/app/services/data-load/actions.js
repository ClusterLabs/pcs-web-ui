import * as types from "./constants";

/* eslint-disable import/prefer-default-export */

export const setUpDataReading = readingDefinitions => ({
  type: types.SET_UP_DATA_READING,
  payload: readingDefinitions,
});
