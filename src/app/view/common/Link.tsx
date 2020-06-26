import React from "react";
import { Link as RRLink } from "react-router-dom";

export const Link = (props: React.ComponentProps<typeof RRLink>) => {
  /* eslint-disable react/jsx-props-no-spreading */
  /* eslint-disable react/destructuring-assignment */
  if (!props.children && props.to) {
    const parts = props.to.toString().split("/");
    return (
      <RRLink data-test="link" {...props}>
        {parts[parts.length - 1]}
      </RRLink>
    );
  }
  return <RRLink data-test="link" {...props} />;
};
