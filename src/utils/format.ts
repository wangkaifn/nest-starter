/**
 * 将未知类型的值转换为布尔值。
 * @param value 要转换的值，可以是字符串、数字或布尔值。
 * @returns 如果值可以转换为 true，则返回 true；否则返回 false。
 */
export function toBoolean(value: unknown): boolean {
  // 如果value是字符串类型
  if (typeof value === 'string') {
    // 去除字符串两端的空白字符，并将其转换为小写
    const cleanedValue = value.trim().toLowerCase();
    // 如果清理后的字符串在['true', '1', 'yes']数组中，则返回true
    return ['true', '1', 'yes'].includes(cleanedValue);
  } else if (typeof value === 'number') {
    // 如果value是数字类型，且不等于0，则返回true
    return value !== 0;
  } else if (typeof value === 'boolean') {
    // 如果value是布尔类型，则直接返回其值
    return value;
  }
  // 其他情况均返回false
  return false;
}
