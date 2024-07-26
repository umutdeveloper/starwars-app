const getValue = <T>(value: unknown, checkType: (value: unknown) => value is T) => {
  if (checkType(value)) return value;
  throw new Error(`Value has wrong format: ${value}`);
};
export const isString = (value: unknown) => typeof value === 'string';
export const isNumber = (value: unknown) => typeof value === 'number';
export const isArray = (value: unknown) => value instanceof Array;
export const getString = (value: unknown) => getValue<string>(value, isString);
export const getNumber = (value: unknown) => getValue<number>(value, isNumber);
export const getArray = (value: unknown) => getValue<unknown[]>(value, isArray);
export const getArrayFor = <T>(value: T[]) => getValue<T[]>(value, isArray);

export const isInvalidDate = (date: Date): boolean => {
  return date instanceof Date && isNaN(date.getTime());
};
export const getDate = (dateText: string) => {
  const date = new Date(dateText);
  if (!isInvalidDate(date)) {
    return dateText;
  }
  throw new Error(`The Date is invalid: ${dateText}`);
};
