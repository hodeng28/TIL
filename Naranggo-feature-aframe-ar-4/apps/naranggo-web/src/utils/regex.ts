const numberPattern = /\d+/g;

export const getNumberFromString = (string: string) => {
  const res = string.match(numberPattern);

  return res ? +res : 0;
};
