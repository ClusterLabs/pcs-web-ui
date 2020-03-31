import { types } from "app/store";

export type GroupComponentProps = {
  cluster: types.cluster.ClusterState,
  detailUrlName?: string,
}

export type DetailComponentProps = {
  detailUrlName: string;
  urlPrefix: string;
  onClose: (e: React.SyntheticEvent) => void;
}
