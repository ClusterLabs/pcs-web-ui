import type {FenceDeviceCreateActions} from "./create";
import type {FenceDeviceEditArgsActions} from "./editArgs";

// biome-ignore format:
export type FenceDeviceActions = (
  & FenceDeviceCreateActions
  & FenceDeviceEditArgsActions
);
