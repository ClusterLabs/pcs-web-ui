import React from "react";

import {ReviewItem} from "./ReviewItem";

export const ReviewYesNo = (props: {
  label: React.ReactNode;
  value: boolean;
  "data-test"?: string;
}) => {
  return (
    <ReviewItem
      label={props.label}
      value={props.value ? "yes" : "no"}
      data-test={props["data-test"]}
    />
  );
};
