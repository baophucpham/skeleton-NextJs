export const truncate = (width: string, lines = 1) => {
  return `
    width: ${width};
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${lines};
  `;
};
