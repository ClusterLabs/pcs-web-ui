import type React from "react";

export type Help = {
  header: React.ReactNode;
  body: React.ReactNode;
  defaultValue?: string | number | null;
};
