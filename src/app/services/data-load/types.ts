import { AnyAction } from "redux";

export interface ReadingDefinition {
  start: AnyAction,
  stop: AnyAction,
  specificator?: any,
}
