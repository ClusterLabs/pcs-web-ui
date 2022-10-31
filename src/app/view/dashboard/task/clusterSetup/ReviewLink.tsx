import {ReviewValue} from "app/view/share";

import {useTask} from "./useTask";

type Link = Parameters<ReturnType<typeof useTask>["updateLinkKnet"]>[0];

export const ReviewLink = ({
  link,
  field,
  label,
  "data-test": dataTest,
}: {
  link: Link;
  field: keyof Link;
  label: string;
  "data-test"?: string;
}) => {
  if (field in link) {
    return (
      <ReviewValue label={label} value={link[field]} data-test={dataTest} />
    );
  }
  return null;
};
