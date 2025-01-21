import type {types} from "app/store";

export type TaskReport =
  | types.LibReport
  | {
      level: types.LibReport["severity"]["level"];
      message: string;
    };
