import type {LocationCreateActions} from "./locationCreate";
import type {ColocationCreateActions} from "./colocationCreate";
import type {OrderCreateActions} from "./orderCreate";
import type {OrderSetCreateActions} from "./orderSetCreate";
import type {ColocationSetCreateActions} from "./colocationSetCreate";
import type {TicketCreateActions} from "./ticketCreate";
import type {TicketSetCreateActions} from "./ticketSetCreate";
import type {SingleCreateActions} from "./singleCreate";
import type {ConstraintDeleteActions} from "./delete";

// biome-ignore format: this is better formating
export type ConstraintAction = (
  & LocationCreateActions
  & OrderCreateActions
  & OrderSetCreateActions
  & ColocationCreateActions
  & ColocationSetCreateActions
  & TicketCreateActions
  & TicketSetCreateActions
  & SingleCreateActions
  & ConstraintDeleteActions
);
