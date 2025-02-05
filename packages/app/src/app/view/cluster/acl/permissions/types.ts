import type {Permission} from "../types";

export type {Permission};

export type UpdatePermissions = (
  transform: (permissions: Permission[]) => Permission[],
) => void;
