export type LoginActions = {
  "LOGIN.FAILED": {
    type: "LOGIN.FAILED";
    payload: {
      badCredentials: boolean;
      message: string;
    };
  };

  "LOGIN.ENTER_CREDENTIALS": {
    type: "LOGIN.ENTER_CREDENTIALS";
    payload: {
      username: string;
      password: string;
    };
  };

  "LOGIN.LOGOUT": {
    type: "LOGIN.LOGOUT";
  };

  "LOGIN.LOGOUT.SUCCESS": {
    type: "LOGIN.LOGOUT.SUCCESS";
  };
};
