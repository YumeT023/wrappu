import { ArgConstraintViolationException } from "../../errors/ArgConstraintViolationException";
import { ArgOptions } from "../../@types/utils";
import { ArgType } from "../../constant/arg";
import { isBool } from "./utils";

type ValidateArg = {
  (name: string, value: any, cmd: string, constraint: ArgOptions): void;
};

export const validateArg: ValidateArg = (name, value, cmd, { type }) => {
  const subject = String(value);

  if (!subject) {
    throw ArgConstraintViolationException(name, value, type, cmd);
  }

  if (type === ArgType.STR && isBool(value)) {
    throw ArgConstraintViolationException(name, value, type, cmd);
  }

  if (type === ArgType.BOOL && !isBool(value)) {
    throw ArgConstraintViolationException(name, value, type, cmd);
  }
};
