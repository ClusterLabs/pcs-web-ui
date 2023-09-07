import {goToResources} from "./common";

const {tree} = marks.cluster.resources;

export const openPrimitive = async (primitiveId: string) => {
  await click(item.byId(tree.primitive, primitiveId, p => p.id));
};

export const goToPrimitive = async (primitiveId: string) => {
  await goToResources();
  await openPrimitive(primitiveId);
};
