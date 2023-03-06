/*
  boolean checker from `any`
 */
export const isTrue = (value: any) => /^true$/.test(value);
export const isFalse = (value: any) => /^false$/.test(value);

export const isBool = (value: any) => isTrue(value) || isFalse(value);
