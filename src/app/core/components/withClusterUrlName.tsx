import React from "react";
import { match as Match } from "react-router";

export function withUrlArgs<T extends Record<string, string>>(
  argNames: (keyof T)[],
  Component: React.ComponentType<T>,
) {
  return ({ match }: {match: Match<T>}) => {
    const componentArgs = argNames.reduce(
      (args, name) => ({
        ...args,
        [name]: match.params[name],
      }),
      {} as T,
    );
    return <Component {...componentArgs} />;
  };
}
