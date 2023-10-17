/**
 * @description 管道函数,处理怎么将 数据转化（可能用于生成邮件内容，或供另一个pipe使用）
 * @returns {any} - eval 函数的返回值
 * @param {string} evalStr - eval 函数的字符串
 * @param {Object} env - 环境变量
 * @param {Object} req - 参数数据
 * @example
 * pipe("{a:1}")(env)(req)
 */
export const pipe = (evalStr: string) => (env: Object) => (req: Object) =>
  Function("env", "req", `return (${evalStr})`)(env, req);
