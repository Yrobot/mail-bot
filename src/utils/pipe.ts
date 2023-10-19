/**
 * @description 管道函数,处理怎么将 数据转化（可能用于生成邮件内容，或供另一个pipe使用）
 * @returns {any} - eval 函数的返回值
 * @param {string} pipeStr - eval 函数的字符串
 * @param {Object} env - 环境变量
 * @param {Object} req - 参数数据
 * @example
 * pipe("{a:1}")(env)(req)
 */
export const pipe = (pipeStr: string) => (env: Object) => (req: Object) =>
  Function("env", "req", `return (${pipeStr})`)(env, req);

export const pipeStrChecker = (pipeStr: string): string | null => {
  try {
    const result = pipe(pipeStr)({})({});
    if (typeof result !== "object") {
      throw new Error("返回值必须是对象");
    }
  } catch (error) {
    return (error as Error).message;
  }
  return null;
};
