export const set3DArray = (array: any, a: any, b: any, c: any) => {
  array[0] = a;
  array[1] = b;
  array[2] = c;
};
export const lerp = (start: number, end: number, value: number) => {
  return (1 - value) * start + value * end;
};
