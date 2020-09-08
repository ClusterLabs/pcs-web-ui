import * as endpoints from "dev/api/endpoints";
import * as responses from "dev/api/responses/all";

const importedClusterList = response =>
  endpoints.importedClusterList((_req, res) => {
    res.json(response);
  });

const clusterStatus = (responseMap = {}) =>
  endpoints.clusterStatus((req, res) => {
    const clusterName = req.params.clusterUrlName;
    if (Object.keys(responseMap).includes(clusterName)) {
      res.json(responseMap[clusterName]);
    } else {
      res.status(404).send("Not found");
    }
  });

const getResourceAgentMetadata = response =>
  endpoints.getResourceAgentMetadata((_req, res) => {
    res.json(response);
  });

const getAvailResourceAgents = response =>
  endpoints.getAvailResourceAgents((_req, res) => {
    res.json(response);
  });

const getFenceAgentMetadata = response =>
  endpoints.getFenceAgentMetadata((_req, res) => {
    res.json(response);
  });

const clusterProperties = response =>
  endpoints.clusterProperties((_req, res) => {
    res.json(response);
  });

const updateResource = endpoints.updateResource((req, res) => {
  /* eslint-disable no-underscore-dangle */
  switch (req.body.name) {
    case "fail":
      res.status(500).send("SOMETHING WRONG");
      break;
    case "invalid":
      res.json("invalid");
      break;
    case "err":
      res.json({
        error: "true",
        stderr: "Stderr output",
        stdout: "Stdout output",
      });
      break;
    default:
      res.json({});
  }
});

const resourceCreate = endpoints.resourceCreate((req, res) => {
  /* eslint-disable no-underscore-dangle */
  switch (JSON.parse(req.body.create_data).resource_id) {
    case "fail":
      res.status(500).send("SOMETHING WRONG");
      break;
    case "invalid":
      res.json({
        status: "invalid status",
        report_list: ["invalid report item"],
        invalid_attribute: true,
      });
      break;
    case "invalid-json":
      try {
        JSON.parse("{");
      } catch (e) {
        res.json({
          status: "input_error",
          status_msg: `Unable to parse input data: ${e.message}`,
          report_list: [],
          data: null,
        });
      }
      break;
    case "missing-key":
      res.json({
        status: "input_error",
        status_msg: "Missing key cmd",
        report_list: [],
        data: null,
      });
      break;
    case "unknown-cmd":
      res.json({
        status: "unknown_cmd",
        status_msg: "Unknown command 'resource.create'",
        report_list: [],
        data: null,
      });
      break;
    case "exist":
      res.json({
        status: "error",
        status_msg: null,
        report_list: [
          {
            severity: "ERROR",
            code: "ID_ALREADY_EXISTS",
            info: {
              id: "exist",
            },
            forceable: null,
            report_text: "'exist' already exists",
          },
        ],
        data: null,
      });
      break;
    default:
      res.json({
        status: "success",
        status_msg: null,
        report_list: [],
        data: null,
      });
  }
});

module.exports = {
  all: [
    importedClusterList(
      responses.importedClusterList.withClusters([
        responses.clusterStatus.resourceTree.cluster_name,
      ]),
    ),
    clusterStatus({
      resourceTree: responses.clusterStatus.resourceTree,
    }),
    getAvailResourceAgents(responses.resourceAgentList.ok),
    getResourceAgentMetadata(responses.resourceAgentMetadata.ok),
    getFenceAgentMetadata(responses.fenceAgentMetadata.ok),
    clusterProperties(responses.clusterProperties.ok),
    updateResource,
    resourceCreate,
  ],
};
