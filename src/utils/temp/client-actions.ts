import toast from "@/toast";

export function wrapper<T extends (...args: any[]) => Promise<any>>(
  request: T,
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>) =>
    new Promise((resolve, reject) =>
      request(...args)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          toast.error(err.message);
          reject(err);
        }),
    );
}
