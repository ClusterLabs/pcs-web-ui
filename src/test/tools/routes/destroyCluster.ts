import { endpoints } from "app/backend/endpoints";

export const destroyCluster = ({
  clusterName,
  status,
}: {
  clusterName: string;
  status?: number;
}) => ({
  url: endpoints.destroyCluster.url({ clusterName: clusterName }),
  body: { all: "1" },
  status: [status ?? 200, ""] as [number, string],
});
