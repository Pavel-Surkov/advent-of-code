export function withTimeLog<T extends (...args: any[]) => any>(
  fn: T,
  ...args: Parameters<T>
): { result: ReturnType<T>; timeMs: string } {
  const start = performance.now();
  const result = fn(...args);
  const end = performance.now();

  const resTimeMs = (end - start).toFixed(2);

  console.log(`Answer: ${result}, execution time: ${resTimeMs}ms`);

  return {
    result,
    timeMs: resTimeMs,
  };
}
