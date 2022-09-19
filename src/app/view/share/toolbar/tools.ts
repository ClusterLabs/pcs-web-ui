import { LauncherItem } from "./types";

export const tryFirstButtonPrimary = <ARGS extends unknown[] = []>(
  buttonsItems: LauncherItem<ARGS>[],
): LauncherItem<ARGS>[] =>
  buttonsItems.map((item, i) =>
    i > 0 || item?.button?.variant
      ? item
      : { ...item, button: { variant: "primary" } },
  );
