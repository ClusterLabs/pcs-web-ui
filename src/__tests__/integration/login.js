import deepmerge from "deepmerge";
import nightmare from 'nightmare';
import request from "request-promise-native";

import stateTool from "../../../dev/state.js";

async function setup(diff){
  const headers = {method: 'POST', 'cache-control': 'no-cache'};
  let options = {
    uri: 'http://localhost:5000/test-set-state',
    method: 'POST',
    json: deepmerge(
      stateTool.defaultState,
      deepmerge({request: {delay: false}}, diff)
    ),
  };
  let response = await request(options);
}

function visit(path){
  return nightmare().goto('http://localhost:3000').wait()
}

function check(fn, onFail){
  // Something similar to https://github.com/facebook/jest/issues/6619 happens.
  // When fn contains something like expect(exists).toBe(false) while exists is
  // "true" then failed test appear, then disapper (it is redrawn) and then only
  //
  // Timeout - Async callback was not invoked within timeout specified by
  // jasmine.DEFAULT_TIMEOUT_INTERVAL.
  //
  // appear.
  // Will see if this will be fixed. This workaround lets fail test and write
  // failed assertion to identify the problem.
  try{
    fn()
  }catch(e){
    onFail(e);
  }
}

describe('login form', function(){
  const promptSelector = "[data-role=login-prompt]";
  const logoutSelector = "[data-role=logout]";

  it('is not shown and can logout when user is logged', async function(done){
    await setup({login: {logged: true}})
    const page = visit("/")

    let loginPromptExists = await page.exists(promptSelector);
    check(() => {expect(loginPromptExists).toBe(false)}, done.fail);

    let logoutButtonExists = await page.exists(logoutSelector)
    check(() => {expect(logoutButtonExists).toBe(true)}, done.fail)

    await page
      .click(logoutSelector)
      .wait(promptSelector)
    ;

    logoutButtonExists = await page.exists(logoutSelector)
    check(() => {expect(logoutButtonExists).toBe(false)}, done.fail)

    page.end();
    done();
  });

  it('is shown and usable when user is not logged', async function(done){
    await setup({login: {logged: false}})

    const page = visit("/")

    let loginPromptExists = await page.exists(promptSelector)
    check(() => {expect(loginPromptExists).toBe(true)}, done.fail)

    const logoutButtonExists = await page.exists(logoutSelector)
    check(() => {expect(logoutButtonExists).toBe(false)}, done.fail)

    await page
      .type(
        `${promptSelector} input[name=username]`,
        stateTool.defaultState.login.username
      )
      .type(
        `${promptSelector} input[name=password]`,
        stateTool.defaultState.login.password
      )
      .click(`${promptSelector} button[name=login]`)
      .wait(logoutSelector)
    ;

    loginPromptExists = await page.exists(promptSelector);
    check(() => {expect(loginPromptExists).toBe(false)}, done.fail);

    page.end();
    done();
  })
})
