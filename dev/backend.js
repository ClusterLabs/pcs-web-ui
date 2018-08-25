const express = require('express');
const bodyParser = require('body-parser');
const defaultState = require("./state.js")

const app = express();

let urlencodedParser = bodyParser.urlencoded({extended: false})
let jsonParser = bodyParser.json();

const port = process.env.PORT || 5000;

let state = defaultState;

function checkLogin(req, res, next){
  const not_checked_paths = ["/ui/login", "/ui/logout", "/test-set-state"]
  if (state.login.logged === false && ! not_checked_paths.includes(req.path)){
    res.status(401).send(state.login.noauthorized);
    return;
  }
  next();
};

app.use(checkLogin);

app.post('/test-set-state', jsonParser, (req, res) => {
  state = req.body;
  res.send("OK")
});

app.get('/clusters_overview', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(state.dashboard));
});

app.get('/managec/:clusterName/cluster_status', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(state.status_map[req.params.clusterName]));
});


app.get('/managec/:clusterName/cluster_properties', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(state.properties_map[req.params.clusterName]));
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
