import {FenceDeviceCreateActions} from "./create";
import {FenceDeviceEditArgsActions} from "./editArgs";

// prettier-ignore
export type FenceDeviceActions = (
  & FenceDeviceCreateActions
  & FenceDeviceEditArgsActions
);
