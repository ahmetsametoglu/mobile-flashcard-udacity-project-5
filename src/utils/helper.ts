export const getCardCountText = (cardCount: number): string => {
  switch (cardCount) {
    case 0:
      return "no card";
    case 1:
      return "1 card";
    default:
      return `${cardCount} cards`;
  }
};
