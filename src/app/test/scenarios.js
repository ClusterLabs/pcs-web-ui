const createScenarioHandler = method => (url, ...args) => {
  if (args.length < 1) {
    throw new Error(`Missing handler for scenario.${method}("${url}").`);
  }

  return {
    url,
    method,
    middleParams: args.slice(0, -1),
    handler: args.slice(-1)[0],
  };
};

module.exports = {
  get: createScenarioHandler("get"),
  post: createScenarioHandler("post"),
};
