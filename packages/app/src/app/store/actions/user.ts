export type UserActions = {
  "USER.SUPERUSER_CHANGED": {
    type: "USER.SUPERUSER_CHANGED";
    payload: {
      isSuperuser: boolean;
    };
  };
  "USER.INIT": {
    type: "USER.INIT";
  };
  "USER.LOADED": {
    type: "USER.LOADED";
    payload: {
      isHaclient: boolean;
      isSuperuser: boolean;
    };
  };
};
