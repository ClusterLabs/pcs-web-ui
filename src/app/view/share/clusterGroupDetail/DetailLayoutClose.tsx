import { Button } from "@patternfly/react-core";
import { TimesIcon } from "@patternfly/react-icons";

import { useGroupDetailViewContext } from "./GroupDetailViewContext";

export const DetailLayoutClose = () => {
  const { closeDetailUrl } = useGroupDetailViewContext();
  return (
    <Button
      variant="plain"
      aria-label="Close panel"
      onClick={(e: React.SyntheticEvent) => {
        e.preventDefault();
        closeDetailUrl();
      }}
    >
      <TimesIcon />
    </Button>
  );
};
