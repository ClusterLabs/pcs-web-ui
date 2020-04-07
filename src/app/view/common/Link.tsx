import React from "react";
import { Link as RRLink } from "react-router-dom";

export const Link = (props: React.ComponentProps<typeof RRLink>) => {
  /* eslint-disable react/jsx-props-no-spreading */
  return <RRLink data-test="link" {...props} />;
};
