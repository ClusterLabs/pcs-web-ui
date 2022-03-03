import { Clone } from "app/view/cluster/types";

import { CloneDetail } from "./CloneDetail";

export const CloneDetailWrapper = ({ clone }: { clone: Clone }) => {
  if (clone.member.itemType !== "fence-device") {
    return (
      <CloneDetail
        id={clone.id}
        member={clone.member}
        issueList={clone.issueList}
      />
    );
  }
  return <>Alert! This is unsupported clone of fence device.</>;
};
