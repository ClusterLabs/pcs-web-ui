import React from "react";

const storageKey = "deprecationMultiClusterDismissed";

export const useDashboardDeprecationDismiss = () => {
  const [dismissed, setDismissed] = React.useState(
    () => localStorage.getItem(storageKey) === "true",
  );

  const dismiss = () => {
    localStorage.setItem(storageKey, "true");
    setDismissed(true);
  };

  const restore = () => {
    localStorage.removeItem(storageKey);
    setDismissed(false);
  };

  return {dismissed, dismiss, restore};
};
