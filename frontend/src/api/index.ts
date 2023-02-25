export const api = (...args: unknown[]) => {
  console.log(args);
  return {
    status: 200,
  };
};
