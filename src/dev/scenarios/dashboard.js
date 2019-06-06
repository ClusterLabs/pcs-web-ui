const responses = require("app/scenes/dashboard/test/responses");
const requests = require("app/scenes/dashboard/test/requests");

const clustersOverview = response => requests.overview(
  (req, res) => { res.json(response); },
);

const clusterStatus = response => requests.status(
  (req, res) => { res.json(response); },
);

module.exports = {
  displayMulti: [
    clustersOverview(responses.dashboard([
      responses.cluster.ok,
      responses.cluster.error,
    ])),
  ],
  goToCluster: [
    clustersOverview(responses.dashboard([responses.cluster.ok])),
    clusterStatus(responses.cluster.ok),
  ],
};
