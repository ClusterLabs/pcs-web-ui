import React from "react";

export const useSelectControll = ({
  activateItem,
  select,
  itemsCount,
}: {
  activateItem: (indexToFocus: number | null) => void;
  select: (indexToFocus: number | null) => void;
  itemsCount: number;
}) => {
  const [currIndex, setCurrIndex] = React.useState<number | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const [prevIndex, nextIndex] = React.useMemo(
    () =>
      currIndex === null ? [itemsCount - 1, 0] : [currIndex - 1, currIndex + 1],
    [itemsCount, currIndex],
  );

  const setFocusTo = (index: number) => {
    if (isOpen) {
      setCurrIndex(index);
      activateItem(index);
    }
  };

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const switchOpen = () => setIsOpen(isOpenCurrently => !isOpenCurrently);
  const isFocused = (index: number) => currIndex === index;
  const noFocus = () => setCurrIndex(null);

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "Enter":
        if (!isOpen) {
          open();
        } else {
          select(currIndex);
        }
        break;
      case "Tab":
      case "Escape":
        close();
        activateItem(null);
        break;
      case "ArrowUp":
        event.preventDefault();
        setFocusTo(prevIndex);
        break;
      case "ArrowDown":
        event.preventDefault();
        setFocusTo(nextIndex);
        break;
    }
  };

  return {
    onInputKeyDown,
    isOpen,
    switchOpen,
    open,
    close,
    isFocused,
    noFocus,
  };
};
