import React from "react";

import {ReviewItem} from "./ReviewItem";

export const ReviewYesNo = ({
  label,
  value,
}: {
  label: React.ReactNode;
  value: boolean;
}) => {
  return <ReviewItem label={label} value={value ? "yes" : "no"} />;
};
