/*global fetch*/

export const fetchClusterData = async(clusterName) => {
  const response = await fetch(`/managec/${clusterName}/cluster_status`, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  return {
    status: response.status,
    data: await response.json(),
  };
};
