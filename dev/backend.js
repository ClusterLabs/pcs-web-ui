const express = require('express');
const bodyParser = require('body-parser');
const defaultState = require("./state.js")

const app = express();

let urlencodedParser = bodyParser.urlencoded({extended: false})
let jsonParser = bodyParser.json();

const port = process.env.PORT || 5000;

let loggedIn = false;

let state = defaultState;

app.post('/test-set-state', jsonParser, (req, res) => {
  state = req.body;
  res.send("OK")
});

app.get('/clusters_overview', (req, res) => {
  if(state.login.logged === false){
    res.status(401).send(state.login.noauthorized);
    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(state.dashboard));
});

const cluster_status = (name, req, res) => {
  if(state.login.logged === false){
    res.status(401).send(state.login.noauthorized);
    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(state.status_map[name]));
};

app.get('/managec/first/cluster_status', (req, res) => {
  cluster_status("first", req, res)
});

app.get('/managec/second/cluster_status', (req, res) => {
  cluster_status("second", req, res)
});

app.get('/managec/third/cluster_status', (req, res) => {
  cluster_status("third", req, res)
});

const cluster_properties = (name, req, res) => {
  if(state.login.logged === false){
    res.status(401).send(state.login.noauthorized);
    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(state.properties_map[name]));
};

app.get('/managec/first/cluster_properties', (req, res) => {
  cluster_properties("first", req, res)
});

app.get('/managec/second/cluster_properties', (req, res) => {
  cluster_properties("second", req, res)
});

app.get('/managec/third/cluster_properties', (req, res) => {
  cluster_properties("third", req, res)
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
