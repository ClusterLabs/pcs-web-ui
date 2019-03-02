/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");
const bodyParser = require("body-parser");
const stateTool = require("./state.js");

const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

let state = stateTool.defaultState;

function checkLogin(req, res, next) {
  const notCheckedPaths = ["/ui/login", "/ui/logout", "/test-set-state"];
  if (state.login.logged === false && !notCheckedPaths.includes(req.path)) {
    res.status(401).send(state.login.noauthorized);
    return;
  }
  next();
}

function sendJson(res, obj) {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(obj));
}

app.use(checkLogin);
if (state.request.delay) {
  app.use((req, res, next) => setTimeout(next, state.request.delay));
}

app.post("/test-set-state", jsonParser, (req, res) => {
  state = req.body;
  res.send("OK");
});

app.get("/manage/check_pcsd_status", (req, res) => {
  const name = req.query.nodes;
  const nodePort = req.query[`port-${req.query.nodes}`];
  /* eslint-disable no-restricted-syntax */
  for (const node of state.nodesToAdd) {
    if (name === node.name && nodePort === node.port) {
      sendJson(res, { [name]: "Online" });
      return;
    }
  }
  sendJson(res, { name: "Unable to authenticate" });
});
app.post(
  "/managec/:clusterUrlName/add_node_to_cluster",
  urlencodedParser,
  urlencodedParser, (req, res) => {
    const name = req.body.new_nodename;
    const nodePort = req.body.new_node_port;
    // const autoOn = req.body.auto_start;

    for (const nodeIndex in state.nodesToAdd) {
      if (!Object.prototype.hasOwnProperty.call(state.nodesToAdd, nodeIndex)) {
        continue;
      }
      const node = state.nodesToAdd[nodeIndex];
      if (name === node.name) {
        if (nodePort === node.port) {
          state.status_map[req.params.clusterUrlName].node_list.push(
            stateTool.node(
              state.status_map[req.params.clusterUrlName].node_list.length,
              name,
            ),
          );
          state.nodesToAdd.splice(nodeIndex, 1);
          setTimeout(() => res.send("Node added successfully."), 2000);
          return;
        }
      }
    }
  },
);

app.get("/clusters_overview", (req, res) => {
  // res.status(401).send(state.login.noauthorized);
  // res.status(500).send("SOMETHING GOT WRONG");
  // sendJson(res, {malformed: "data"})
  // res.send("OK")
  sendJson(res, state.dashboard);
});

app.get("/managec/:clusterUrlName/cluster_status", (req, res) => {
  // res.status(500).send("SOMETHING GOT WRONG");
  sendJson(res, state.status_map[req.params.clusterUrlName]);
});


app.get("/managec/:clusterUrlName/cluster_properties", (req, res) => {
  // res.status(500).send("SOMETHING GOT WRONG");
  sendJson(res, state.properties_map[req.params.clusterUrlName]);
});

app.get("/ui/logout", (req, res) => {
  // res.status(500).send("SOMETHING GOT WRONG");
  // res.status(401).send(state.login.noauthorized);
  state.login.logged = false;
  res.send("OK");
});

app.post("/ui/login", urlencodedParser, (req, res) => {
  if (
    req.body.username === state.login.username
    &&
    req.body.password === state.login.password
  ) {
    // res.status(500).send("SOMETHING GOT WRONG");
    state.login.logged = true;
    res.send(state.login.ajaxId);
    return;
  }
  res.status(401).send(state.login.noauthorized);
});

module.exports = { app };
