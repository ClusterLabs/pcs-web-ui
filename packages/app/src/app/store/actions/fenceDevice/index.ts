import type {FenceDeviceCreateActions} from "./create";
import type {FenceDeviceEditArgsActions} from "./editArgs";

// biome-ignore format: this is better formating
export type FenceDeviceActions = (
  & FenceDeviceCreateActions
  & FenceDeviceEditArgsActions
);
