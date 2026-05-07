import type React from "react";
import {ReviewItem} from "app/view/share";

import type {useTask} from "./useTask";

type Link = Parameters<ReturnType<typeof useTask>["updateLinkKnet"]>[0];

type ReactNodeField<T> = {
  [K in keyof T]-?: T[K] extends React.ReactNode ? K : never;
}[keyof T];

export const ReviewLink = ({
  link,
  field,
  label,
  "data-test": dataTest,
}: {
  link: Link;
  field: ReactNodeField<Link>;
  label: string;
  "data-test"?: string;
}) => {
  if (field in link) {
    return (
      <ReviewItem label={label} value={link[field]} data-test={dataTest} />
    );
  }
  return null;
};
