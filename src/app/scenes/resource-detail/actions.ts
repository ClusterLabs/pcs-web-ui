export interface CorrectWrongResourceTypeView {
  type: "RESOURCE_TREE_ITEM_TYPE.CORRECT_VIEW";
  payload: {
    resourceId: string;
    viewName: string;
    url: string;
  };
}
