import { LocationCreateActions } from "./locationCreate";
import { OrderCreateActions } from "./orderCreate";
import { OrderSetCreateActions } from "./orderSetCreate";
import { TicketSetCreateActions } from "./ticketSetCreate";

// prettier-ignore
export type ConstraintAction = (
  & LocationCreateActions
  & OrderCreateActions
  & OrderSetCreateActions
  & TicketSetCreateActions
);
