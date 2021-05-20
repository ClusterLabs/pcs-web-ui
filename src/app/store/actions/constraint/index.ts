import { LocationCreateActions } from "./locationCreate";
import { OrderCreateActions } from "./orderCreate";
import { OrderSetCreateActions } from "./orderSetCreate";
import { ColocationSetCreateActions } from "./colocationSetCreate";
import { TicketSetCreateActions } from "./ticketSetCreate";
import { SingleCreateActions } from "./singleCreate";

// prettier-ignore
export type ConstraintAction = (
  & LocationCreateActions
  & OrderCreateActions
  & OrderSetCreateActions
  & ColocationSetCreateActions
  & TicketSetCreateActions
  & SingleCreateActions
);
