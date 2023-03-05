import { Exception } from "../@types/error";
import { Code } from "../constant/error";
import { normalize } from "./utils/normalize";
import { interpolate } from "../utils/interpolate";
import { ArgType } from "../constant/arg";

class ArgConstraintViolation implements Exception {
  private static readonly TEMPLATE = `arg value '{}' doesn't satisfy the constraint arg({}: {}) of cmd('{}')`;
  code: Code;
  message: string;
  name: string;

  constructor(...context: any[]) {
    this.code = Code.ARG_CONSTRAINT_VIOLATION;
    this.message = interpolate(ArgConstraintViolation.TEMPLATE, ...context);
    this.name = ArgConstraintViolationException.name;
  }
}

export const ArgConstraintViolationException = (
  name: string,
  value: any,
  type: ArgType,
  cmd: string
) => {
  return normalize(new ArgConstraintViolation(value, name, type, cmd), this);
};
