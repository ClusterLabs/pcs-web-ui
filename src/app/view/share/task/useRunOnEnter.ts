import React from "react";

export const useRunOnEnter = (run: () => void) => {
  React.useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === "Enter" || e.code === "NumpadEnter") {
        e.preventDefault();
        run();
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [run]);
};
