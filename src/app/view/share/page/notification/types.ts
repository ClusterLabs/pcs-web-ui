import {selectors} from "app/store";

const {getNotifications} = selectors;
export type Notification = ReturnType<typeof getNotifications>[number];
