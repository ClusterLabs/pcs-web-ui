const GET = "get";

const overview = handler => ({
  url: "/clusters_overview",
  method: GET,
  handler,
});

const status = handler => ({
  url: `/managec/:clusterUrlName/cluster_status`,
  method: GET,
  handler,
});


module.exports = {
  overview,
  status,
};
