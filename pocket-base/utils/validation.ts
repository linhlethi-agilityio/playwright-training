const filterEmpty = (values: string[]) => values.filter((v) => v !== 'N/A');

export const isAscending = (values: string[]) => {
  const filtered = filterEmpty(values);
  return filtered.every((val, i) => i === 0 || val >= filtered[i - 1]);
};

export const isDescending = (values: string[]) => {
  const filtered = filterEmpty(values);
  return filtered.every((val, i) => i === 0 || val <= filtered[i - 1]);
};
