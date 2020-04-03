export type AuthActions = {
  AuthRequired: { type: "AUTH.REQUIRED" };

  AuthSuccess: {
    type: "AUTH.SUCCESS";
    payload: {
      username: string;
    };
  };
};
