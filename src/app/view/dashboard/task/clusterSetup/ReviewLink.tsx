import React from "react";

import { ReviewValue } from "app/view/share";

import { useTask } from "./useTask";

type Link = Parameters<ReturnType<typeof useTask>["updateLinkKnet"]>[0];

export const ReviewLink: React.FC<{
  link: Link;
  field: keyof Link;
  label: string;
  "data-test"?: string;
}> = ({ link, field, label, "data-test": dataTest }) => {
  if (field in link) {
    return (
      <ReviewValue label={label} value={link[field]} data-test={dataTest} />
    );
  }
  return null;
};
