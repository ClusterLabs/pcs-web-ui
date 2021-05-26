import { LocationCreateActions } from "./locationCreate";
import { ColocationCreateActions } from "./colocationCreate";
import { OrderCreateActions } from "./orderCreate";
import { OrderSetCreateActions } from "./orderSetCreate";
import { ColocationSetCreateActions } from "./colocationSetCreate";
import { TicketCreateActions } from "./ticketCreate";
import { TicketSetCreateActions } from "./ticketSetCreate";
import { SingleCreateActions } from "./singleCreate";

// prettier-ignore
export type ConstraintAction = (
  & LocationCreateActions
  & OrderCreateActions
  & OrderSetCreateActions
  & ColocationCreateActions
  & ColocationSetCreateActions
  & TicketCreateActions
  & TicketSetCreateActions
  & SingleCreateActions
);
