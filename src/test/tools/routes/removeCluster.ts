import { endpoints } from "app/backend/endpoints";

export const removeCluster = ({
  clusterName,
  status,
}: {
  clusterName: string;
  status?: number;
}) => ({
  url: endpoints.removeCluster.url,
  body: { [`clusterid-${clusterName}`]: "true" },
  status: [status ?? 200, ""] as [number, string],
});
