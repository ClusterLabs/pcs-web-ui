import { Action } from "app/actions";

export interface ReadingDefinition {
  start: Action,
  stop: Action,
  specificator?: any,
}
