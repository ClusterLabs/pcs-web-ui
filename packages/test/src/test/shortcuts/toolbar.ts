export const toolbar = <TOOLBAR extends Mark>(toolbar: TOOLBAR) => {
  return {
    launch: async (getToolbarItem: (_toolbar: TOOLBAR) => Mark | Mark[]) => {
      const markOrMarkList = getToolbarItem(toolbar);
      const markList = Array.isArray(markOrMarkList)
        ? markOrMarkList
        : [markOrMarkList];

      for (let i = 0; i < markList.length; i++) {
        await click(markList[i]);
      }
    },
  };
};
