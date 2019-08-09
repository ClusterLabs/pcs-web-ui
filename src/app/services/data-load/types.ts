import { AnyAction } from "redux";

export const SET_UP_DATA_READING = "/core/SET_UP_DATA_READING";

export interface ReadingDefinition {
  start: AnyAction,
  stop: AnyAction,
  specificator?: any,
}

export interface SetupDataReadingAction extends AnyAction {
  type: typeof SET_UP_DATA_READING,
  payload: Record<string, ReadingDefinition>,
}
