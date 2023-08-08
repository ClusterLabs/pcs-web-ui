export const dashboard = {
  toolbar: {
    setupCluster: {},
    importExistingCluster: {},
  },
  clusterList: {
    cluster: {
      name: {},
      loaded: {
        issuesCount: {},
        issue: {
          message: {},
        },
        nodes: {
          list: {
            node: {
              name: {},
              status: {},
              quorum: {},
            },
          },
        },
        resources: {
          list: {
            resource: {
              id: {},
              status: {},
            },
          },
        },
        fenceDevices: {
          list: {
            fenceDevice: {
              id: {},
              status: {},
            },
          },
        },
        actions: {
          start: {},
          stop: {},
          remove: {},
          destroy: {},
        },
      },
    },
  },
};
