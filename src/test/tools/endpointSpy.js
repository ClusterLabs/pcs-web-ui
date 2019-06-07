const spyRequests = (requests) => {
  const records = {};
  const newRequests = {};

  Object.keys(requests).forEach((name) => {
    newRequests[name] = handler => requests[name]((req, res) => {
      records[name] = [...(records[name] || []), req];
      handler(req, res);
    });
  });

  return [newRequests, records];
};

const clearSpyLog = (records) => {
  /* eslint-disable no-param-reassign */
  Object.keys(records).forEach((name) => {
    delete records[name];
  });
};

module.exports = {
  spyRequests,
  clearSpyLog,
};
