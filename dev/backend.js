const express = require('express');
const bodyParser = require('body-parser');
const stateTool = require("./state.js")

const app = express();

let urlencodedParser = bodyParser.urlencoded({extended: false})
let jsonParser = bodyParser.json();

const port = process.env.PORT || 5000;

let state = stateTool.defaultState;

function checkLogin(req, res, next){
  const not_checked_paths = ["/ui/login", "/ui/logout", "/test-set-state"]
  if (state.login.logged === false && ! not_checked_paths.includes(req.path)){
    res.status(401).send(state.login.noauthorized);
    return;
  }
  next();
};

function sendJson(res, obj){
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(obj));
};

app.use(checkLogin);

app.post('/test-set-state', jsonParser, (req, res) => {
  state = req.body;
  res.send("OK")
});

app.get('/manage/check_pcsd_status', (req, res) => {
  const name = req.query.nodes;
  const port = req.query[`port-${req.query.nodes}`];
  for(let node of state.nodes_to_add){
    if(name == node.name && port == node.port){
      sendJson(res, {[name]: "Online"})
      return;
    }
  }
  sendJson(res, {name: "Unable to authenticate"})
});
app.post(
  '/managec/:clusterName/add_node_to_cluster',
  urlencodedParser,
  urlencodedParser, (req, res) => {
    const name = req.body.new_nodename;
    const port = req.body.new_node_port;
    const autoOn = req.body.auto_start;

    for(let nodeIndex in state.nodes_to_add){
      let node = state.nodes_to_add[nodeIndex];
      if(name == node.name){
        if(port == node.port){
          state.status_map[req.params.clusterName].node_list.push(
            stateTool.node(
              state.status_map[req.params.clusterName].node_list.length,
              name
            )
          )
          state.nodes_to_add.splice(nodeIndex, 1);
          res.send("Node added successfully.")
          return;
        }
      }
    }
  }
);

app.get('/clusters_overview', (req, res) => {
  sendJson(res, state.dashboard)
});

app.get('/managec/:clusterName/cluster_status', (req, res) => {
  sendJson(res, state.status_map[req.params.clusterName])
});


app.get('/managec/:clusterName/cluster_properties', (req, res) => {
  sendJson(res, state.properties_map[req.params.clusterName])
});

app.get('/ui/logout', (req, res) => {
  state.login.logged = false
  res.send("OK")
});

app.post('/ui/login', urlencodedParser, (req, res) => {
  if(
    req.body.username == state.login.username
    &&
    req.body.password == state.login.password
  ){
    state.login.logged = true
    res.send(state.login.ajaxId)
    return
  }
  res.status(401).send(state.login.noauthorized);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
