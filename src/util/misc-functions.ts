export const set3DArray = (array: any, a: any, b: any, c: any) => {
  array[0] = a;
  array[1] = b;
  array[2] = c;
};
export const lerp = (start: number, end: number, value: number) => {
  return (1 - value) * start + value * end;
};
export const drawGradient = (
  canvas: HTMLCanvasElement,
  colors: string[],
  stops: number[]
) => {
  const context = canvas.getContext("2d")!;
  const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  colors.forEach((color, index) => gradient.addColorStop(stops[index], color));
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
};
