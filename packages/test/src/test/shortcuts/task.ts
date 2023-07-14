export const expectReview = async (pairs: [Mark, string][]) => {
  for (let i = 0; i < pairs.length; i++) {
    const [mark, expectedValue] = pairs[i];
    if (isLocator(mark)) {
      expect(await mark.innerText()).toEqual(expectedValue);
    } else {
      expect(await mark.locator.innerText()).toEqual(expectedValue);
    }
  }
};

export const expectReports = (mark: Mark) => ({
  count: async (count: number) => {
    expect(await locatorFor(mark).count()).toEqual(count);
  },
});
