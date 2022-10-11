import { LauncherItem } from "./types";

export const tryFirstButtonPrimary = (
  buttonsItems: LauncherItem[],
): LauncherItem[] =>
  buttonsItems.map((item, i) =>
    i > 0 || item?.button?.variant
      ? item
      : { ...item, button: { variant: "primary" } },
  );
