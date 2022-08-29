export type NotificationActions = {
  "NOTIFICATION.CREATE": {
    type: "NOTIFICATION.CREATE";
    payload: {
      id: number;
      severity: "INFO" | "SUCCESS" | "ERROR";
      message: string;
      inToast: boolean;
      isRead: boolean;
      creationTime: Date;
      description?: string;
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

  "NOTIFICATION.REMOVE_FROM_TOAST": {
    type: "NOTIFICATION.REMOVE_FROM_TOAST";
    payload: {
      id: number;
    };
  };

  "NOTIFICATION.READ": {
    type: "NOTIFICATION.READ";
    payload: {
      id: number;
    };
  };

  "NOTIFICATION.READ.ALL": {
    type: "NOTIFICATION.READ.ALL";
  };
};
