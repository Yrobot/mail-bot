// Need client add logic, so not use for now

export function wrapper<T, P extends any[], E extends Error>(
  asyncFunc: (...args: P) => Promise<T>,
): (...args: P) => Promise<T | { error: string }> {
  return async (...args: P) => {
    try {
      return await asyncFunc(...args);
    } catch (error) {
      return { error: (error as E)?.message };
    }
  };
}
