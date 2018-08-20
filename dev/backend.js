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
