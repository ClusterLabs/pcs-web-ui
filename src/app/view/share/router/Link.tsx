import React from "react";

import {useLocation} from "./Router";
import {SimpleLink} from "./SimpleLink";

export const Link = (
  props: {
    ["data-test"]?: string;
    strong?: boolean;
    isInline?: boolean;
  } & (
    | {
        to: string;
        children?: React.ReactNode;
      }
    | {
        onClick: (
          _navigate: ReturnType<typeof useLocation>["navigate"],
        ) => void;
        children: React.ReactNode;
      }
  ),
) => {
  const {navigate} = useLocation();

  let label = props.children;

  if ("to" in props) {
    if (!label) {
      const parts = props.to.split("/");
      label = parts[parts.length - 1];
    }
    return (
      <SimpleLink
        onClick={() => navigate(props.to)}
        label={label}
        data-test={props["data-test"]}
        strong={props.strong}
        isInline={props.isInline}
      />
    );
  }

  return (
    <SimpleLink
      onClick={() => props.onClick(navigate)}
      label={label}
      data-test={props["data-test"]}
      strong={props.strong}
      isInline={props.isInline}
    />
  );
};
