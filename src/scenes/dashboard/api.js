/*global fetch*/

export const fetchDashboardData = async() => {
  const response = await fetch("/clusters_overview", {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  return {
    status: response.status,
    data: await response.json(),
  };
};
