export type AuthActions = {
  "AUTH.REQUIRED": {
    type: "AUTH.REQUIRED";
  };

  "AUTH.SUCCESS": {
    type: "AUTH.SUCCESS";
    payload: {
      username: string;
    };
  };
};
