export type NotificationActions = {
  "NOTIFICATION.CREATE": {
    type: "NOTIFICATION.CREATE";
    payload: {
      notification: {
        id: number;
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
  };

  "NOTIFICATION.DESTROY": {
    type: "NOTIFICATION.DESTROY";
    payload: {
      id: number;
    };
  };
};
