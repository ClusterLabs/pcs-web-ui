import type {FenceDeviceCreateActions} from "./create";
import type {FenceDeviceEditArgsActions} from "./editArgs";
import type {FenceDeviceDisableActions} from "./disable";

// biome-ignore format: this is better formating
export type FenceDeviceActions = (
  & FenceDeviceCreateActions
  & FenceDeviceEditArgsActions
  & FenceDeviceDisableActions
);
