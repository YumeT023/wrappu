import { ArgConstraintViolation, WrappuError } from "../common/error";
import { ArgOptions, ArgType } from "../interface/cli_metadata";

/** boolean checker from `any` */
export function isTrue(value: any) {
  return /^true$/.test(value);
}

export function isFalse(value: any) {
  return /^false$/.test(value);
}

export function isBool(value: any) {
  return isTrue(value) || isFalse(value);
}

export function isArgValidBool(type: ArgType, value: any) {
  return (
    (type === ArgType.BOOL && isBool(value)) ||
    (type === ArgType.STR && !isBool(value))
  );
}

export const validateArg = (
  name: string,
  value: any,
  cmd: string,
  constraints: ArgOptions
) => {
  const { type } = constraints;
  if (!value) {
    WrappuError.throw(new ArgConstraintViolation(value, name, type, cmd));
  }
  if (!isArgValidBool(type, value)) {
    WrappuError.throw(new ArgConstraintViolation(value, name, type, cmd));
  }
};
