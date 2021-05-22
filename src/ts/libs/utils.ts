export const sleep = (x: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, x));
