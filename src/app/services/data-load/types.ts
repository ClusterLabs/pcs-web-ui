import { Action } from "app/common/actions";

export interface ReadingDefinition {
  start: Action,
  stop: Action,
  specificator?: any,
}
