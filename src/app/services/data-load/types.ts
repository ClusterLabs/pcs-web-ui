import { AnyAction } from "redux";

export const SET_UP_DATA_READING = "/core/SET_UP_DATA_READING";

export interface ReadingDefinition {
  start: AnyAction,
  stop: AnyAction,
  specificator?: any,
}
