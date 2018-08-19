/*global fetch*/

export const fetchClusterProperties = async(clusterName) => {
  const response = await fetch(`/managec/${clusterName}/cluster_properties`, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  return {
    status: response.status,
    data: await response.json(),
  };
};
