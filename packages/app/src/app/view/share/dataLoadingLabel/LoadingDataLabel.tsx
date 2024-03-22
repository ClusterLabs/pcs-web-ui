import {InProgressIcon} from "@patternfly/react-icons";

import {LoadingDataAgeLabel} from "./LoadingDataAgeLabel";
import {LoadingLabel} from "./LoadingLabel";

export const LoadingDataLabel = (props: {
  onClick: () => void;
  when: number;
  isLoading: boolean;
}) => {
  return props.isLoading ? (
    <LoadingLabel icon={<InProgressIcon />}>loading</LoadingLabel>
  ) : (
    <LoadingDataAgeLabel onClick={props.onClick} when={props.when} />
  );
};
