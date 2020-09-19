export type NotificationActions = {
  Create: {
    type: "NOTIFICATION.CREATE";
    payload: {
      notification: {
        id: number;
        severity: "INFO" | "SUCCESS" | "ERROR";
        message: string;
        details?: {
          type: "LIST";
          title: string;
          items: string[];
        };
      };
    };
  };

  Destroy: {
    type: "NOTIFICATION.DESTROY";
    payload: {
      id: number;
    };
  };
};
