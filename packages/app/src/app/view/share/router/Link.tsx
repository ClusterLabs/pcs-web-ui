import type React from "react";

import {useLocation} from "./Router";

export const Link = (props: {
  "data-test"?: string;
  strong?: boolean;
  isInline?: boolean;
  to: string;
  children?: React.ReactNode;
}) => {
  const {navigate, resolveLocation} = useLocation();

  let label = props.children;

  if (!label) {
    const parts = props.to.split("/");
    label = parts[parts.length - 1];
  }

  let decoratedLabel = label;
  if (props["data-test"]) {
    decoratedLabel = (
      <span data-test={props["data-test"]}>{decoratedLabel}</span>
    );
  }
  if (props.strong) {
    decoratedLabel = <strong>{decoratedLabel}</strong>;
  }
  return (
    <a
      href={resolveLocation(props.to)}
      onClick={e => {
        if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
          e.preventDefault();
          navigate(props.to);
        }
      }}
    >
      {decoratedLabel}
    </a>
  );
};
