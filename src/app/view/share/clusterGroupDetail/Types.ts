import { Action } from "app/store";

export type ConfirmAction = {
  confirm: {
    title: string;
    description: React.ReactNode;
  };
  action: Action;
};

export type ConfirmData = ConfirmAction & { name: string };
