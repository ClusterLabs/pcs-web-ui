export type NotificationActions = {
  "NOTIFICATION.CREATE": {
    type: "NOTIFICATION.CREATE";
    payload: {
      id: number;
      isVisible: boolean;
      severity: "INFO" | "SUCCESS" | "ERROR";
      message: string;
      details?:
        | {
            type: "LIST";
            title: string;
            items: string[];
          }
        | {
            type: "LINES";
            lines: string[];
          };
    };
  };

  "NOTIFICATION.DESTROY": {
    type: "NOTIFICATION.DESTROY";
    payload: {
      id: number;
    };
  };

  "NOTIFICATION.DESTROY.ALL": {
    type: "NOTIFICATION.DESTROY.ALL";
  };

  "NOTIFICATION.HIDE": {
    type: "NOTIFICATION.HIDE";
    payload: {
      id: number;
    };
  };
};
