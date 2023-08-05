import * as shortcuts from "test/shortcuts";

import {goToResources} from "./common";

const {tree} = marks.cluster.resources;

export const primitiveListItem = (primitiveId: string) =>
  shortcuts.common.item(tree.primitive).byKey(tree.primitive.id, primitiveId);

export const openPrimitive = async (primitiveId: string) => {
  await click(primitiveListItem(primitiveId).locator(tree.primitive.id));
};

export const goToPrimitive = async (primitiveId: string) => {
  await goToResources();
  await openPrimitive(primitiveId);
};

export const toolbar = shortcuts.toolbar(
  marks.cluster.resources.currentPrimitive.toolbar,
);
