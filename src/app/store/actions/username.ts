export type UsernameActions = {
  LoadUsername: {
    type: "USERNAME.LOAD";
  };

  SetUsername: {
    type: "USERNAME.SET";
    payload: {
      username: string;
    };
  };
};
