import {InProgressIcon} from "@patternfly/react-icons";

import {ClusterStatusAgeLabel} from "./ClusterStatusAgeLabel";
import {LoadingLabel} from "./LoadingLabel";

export const ClusterStatusLoadingLabel = (props: {
  clusterName: string;
  when: number;
  isLoading: boolean;
}) => {
  return props.isLoading ? (
    <LoadingLabel icon={<InProgressIcon />}>loading</LoadingLabel>
  ) : (
    <ClusterStatusAgeLabel clusterName={props.clusterName} when={props.when} />
  );
};
